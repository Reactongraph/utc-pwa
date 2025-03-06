import axios from "axios";
import { headers } from "next/headers";

export const createServerAxios = async () => {
  const headersList = await headers();
  console.log("headersList ============ ", headersList.get("authorization"));
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(headersList.get("authorization")
        ? { authorization: headersList.get("authorization") }
        : {}),
      // authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2E1YjQ1MmY5YTI3NmY1NTc1ZjJjMWEiLCJjb3VudHJ5IjoiSW5kaWEiLCJkZXZpY2VJZCI6IjEyMzQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczODkxMzM5MywiZXhwIjoxNzM4OTk5NzkzfQ.sQsv3xF-2DqMDXFOkXQtVVx9H7ickkU4eYbDqAst3dg",
    },
  });
};
