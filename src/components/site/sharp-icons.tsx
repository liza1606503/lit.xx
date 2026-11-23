"use client";

import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

function base({ size = 20, strokeWidth = 1.5, ...props }: IconProps & { strokeWidth?: number }) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    ...props,
  };
}

export function IconContext(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="16" />
      <path d="M3 9h18M8 4v5M16 4v5" />
    </svg>
  );
}

export function IconText(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 5h18M3 19h18" />
      <path d="M7 5v14" />
      <path d="M11 9h7M11 13h7" />
    </svg>
  );
}

export function IconTelegraph(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 9h18M7 13h4M7 16h2" />
      <path d="M14 13h3M14 16h3" />
    </svg>
  );
}

export function IconFeed(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" />
    </svg>
  );
}

export function IconExhibitions(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M3 21h18M9 21V12h6v9" />
    </svg>
  );
}

export function IconAbout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7v1" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v16M6 14l6 6 6-6" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
      <rect x="9" y="7" width="6" height="6" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="6" width="6" height="6" />
      <rect x="14" y="6" width="6" height="6" />
      <path d="M2 21v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3M14 14h4a4 4 0 0 1 4 4v3" />
    </svg>
  );
}

export function IconHeadphones(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="5" height="6" />
      <rect x="16" y="14" width="5" height="6" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

export function IconLayoutGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M3 16l5-5 4 4 3-3 6 6" />
      <rect x="8" y="7" width="3" height="3" />
    </svg>
  );
}

export function IconListOrdered(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 4h12M9 12h12M9 20h12" />
      <path d="M4 4v4M3 8h3M3 12h3l-2 2v2M3 18h3v2H3v-2z" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4l14 8-14 8V4z" />
    </svg>
  );
}

export function IconPause(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
    </svg>
  );
}

export function IconBookText(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconNewspaper(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 4h16v16H3z" />
      <path d="M3 8h16M7 12h4M7 16h4M13 12h3M13 16h3" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h14v6a7 7 0 0 1-14 0V4z" />
      <path d="M5 6H2v2a4 4 0 0 0 4 4M19 6h3v2a4 4 0 0 1-4 4M9 21h6M12 17v4" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8" y="3" width="8" height="8" />
      <path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4h6v16h-6" />
      <path d="M10 12h10M16 8l4 4-4 4" />
    </svg>
  );
}

export function IconLogin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 4h10v16H10" />
      <path d="M14 12H4M8 8l-4 4 4 4" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l2.5 6h6.5l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z" />
    </svg>
  );
}

export function IconQuiz(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" />
      <path d="M9 9a3 3 0 1 1 4 2.7c-1 .5-1 1.3-1 2.3M12 17v1" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 4l8 8-8 8" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9l8 8 8-8" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="12" height="12" />
      <path d="M15 15l6 6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
