"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeetup } from "@fortawesome/free-brands-svg-icons";

interface MeetupIconProps {
  className?: string;
}

export function MeetupIcon({ className = "h-5 w-5" }: MeetupIconProps) {
  return <FontAwesomeIcon icon={faMeetup} className={className} />;
}
