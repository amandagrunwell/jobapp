"use client";

import React, { useEffect, useMemo, useState } from "react";
import { fullData } from "../envStore/types";
import Link from "next/link";
import Admin from "./Admin";
import GeneratePdfView from "./GeneratePdfView";

export default function AdminDashboard(): React.ReactElement {
  const views = { generatePdf: <GeneratePdfView />, table: <Admin /> };

  return views.generatePdf;
}
