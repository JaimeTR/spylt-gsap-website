import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/projects folder
    // Ensure the filename is safe or generate a unique one
    const fileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'projects');
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    // Return the public URL path
    return NextResponse.json({ 
      success: true, 
      imageUrl: `/projects/${fileName}` 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
