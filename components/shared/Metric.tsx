import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const Metric: React.FC<MetricProps> = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${
          isAuthor ? "h-4 w-4 rounded-full object-cover" : ""
        }`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link className="flex-center gap-1" href={href}>
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
