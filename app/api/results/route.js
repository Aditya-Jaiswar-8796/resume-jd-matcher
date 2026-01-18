import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function POST(request) {
    const { id } = await request.json();
    return NextResponse.json({
        results: store.get(id).results,
        files: store.get(id).files,
  });
}