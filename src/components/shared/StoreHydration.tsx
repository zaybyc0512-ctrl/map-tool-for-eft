"use client";

import { useEffect, useState } from "react";
import { useMapStore } from "@/lib/store";

export default function StoreHydration() {
    useEffect(() => {
        useMapStore.persist.rehydrate();
    }, []);

    return null;
}
