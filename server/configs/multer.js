import multer from "multer";

// DiskStorage ki jagah MemoryStorage use karein
const storage = multer.memoryStorage(); 
export const upload = multer({ storage });