import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
    console.log(request);

    const body = (await request.json()) as { paramsToSign: Record<string, string> }
    console.log(body);
    const { paramsToSign } = body;

    const signature = cloudinary.v2.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);

    return Response.json({signature});
}