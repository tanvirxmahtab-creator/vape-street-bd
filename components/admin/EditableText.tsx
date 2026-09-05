'use client';

import React from "react";
import { useSiteContent, defaultSiteContent, SiteContentMap } from "@/src/lib/siteContent";

interface EditableTextProps {
  section: keyof SiteContentMap;
  field: string;
  fallback?: string;
  isMultiline?: boolean;
  label?: string;
  className?: string;
  as?: React.ElementType;
}

export function EditableText({
  section,
  field,
  fallback = "",
  isMultiline = false,
  label,
  className = "",
  as: Component = "span",
}: EditableTextProps) {
  const { content, isVisualEditMode, setActiveEditField } = useSiteContent();
  
  // @ts-ignore
  const currentValue = content[section]?.[field] || fallback;
  // @ts-ignore
  const defaultValue = defaultSiteContent[section]?.[field] || fallback;

  // Check admin authorization
  const isAdminAuth = typeof window !== "undefined" && sessionStorage.getItem("vape_street_admin_auth") === "true";
  const canEdit = isVisualEditMode && isAdminAuth;

  if (!canEdit) {
    return <Component className={className}>{currentValue}</Component>;
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if ('nativeEvent' in e) {
      e.nativeEvent.stopImmediatePropagation();
    }
    const displayLabel = label || `${section}.${field}`;
    setActiveEditField({
      section,
      field,
      label: displayLabel,
      isMultiline,
      defaultValue,
    });
  };

  return (
    <Component
      onClick={handleClick}
      onMouseDown={handleClick}
      onPointerDown={handleClick}
      className={`relative inline transition-all cursor-pointer pointer-events-auto hover:outline hover:outline-2 hover:outline-dashed hover:outline-[#C5A880] hover:outline-offset-2 hover:bg-[#C5A880]/10 rounded px-0.5 ${className}`}
      title={`Click to edit: ${label || `${section}.${field}`}`}
    >
      {currentValue}
    </Component>
  );
}
