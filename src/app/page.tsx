import Image from "next/image";
import React from "react";
import { redirect, RedirectType } from 'next/navigation';

export default function Home() {
  redirect('/login', RedirectType.replace)
}
