/* eslint-disable camelcase */
import {Webhook} from "svix";
import {headers} from "next/headers";
import {WebhookEvent} from "@clerk/nextjs/server";
import {createUser, deleteUser, updateUser} from "@/lib/actions/user.action";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
  console.log("=== WEBHOOK RECEIVED ===");
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  console.log("WEBHOOK_SECRET exists:", !!WEBHOOK_SECRET);
  console.log("WEBHOOK_SECRET length:", WEBHOOK_SECRET?.length || 0);

  if (!WEBHOOK_SECRET) {
    console.log("WEBHOOK_SECRET is missing!");
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
  
  console.log("Headers received:");
  console.log("- svix-id:", svix_id);
  console.log("- svix-timestamp:", svix_timestamp);
  console.log("- svix-signature:", svix_signature ? "exists" : "missing");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("Missing required headers, returning error");
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  console.log("Request payload:", payload);
  console.log("Event type:", payload.type);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    console.log("Attempting to verify webhook...");
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("Webhook verification successful");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log("Processing event type:", eventType);

  if (eventType === "user.created") {
    console.log("Creating new user...");
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    try {
      // Create a new user in a database
      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      });
      console.log("User created successfully:", mongoUser);
      return NextResponse.json({ message: "OK", user: mongoUser });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    console.log("Updating user...");
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    try {
      // Prepare the update data
      const updateData: any = {
        name: `${first_name}${last_name ? ` ${last_name}` : ""}`,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      };

      // Update the user in the database
      const mongoUser = await updateUser({
        clerkId: id,
        updateData,
        path: `/profile/${id}`,
      });
      console.log("User updated successfully:", mongoUser);
      return NextResponse.json({ message: "OK", user: mongoUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user", { status: 500 });
    }
  }
  
  if (eventType === "user.deleted") {
    console.log("Deleting user...");
    const { id } = evt.data;

    try {
      const deletedUser = await deleteUser({
        clerkId: id!,
      });
      console.log("User deleted successfully:", deletedUser);
      return NextResponse.json({ message: "OK", user: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  console.log("Event type not handled:", eventType);
  return NextResponse.json({ message: "OK" });
}
