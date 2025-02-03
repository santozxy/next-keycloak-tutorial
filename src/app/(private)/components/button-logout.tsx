"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function ButtonLogout() {
  const handleLogout = async () => {
    signOut();
  };
  return (
    <Button size="lg" onClick={handleLogout}>
      Sair
    </Button>
  );
}
