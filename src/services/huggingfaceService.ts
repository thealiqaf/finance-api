import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/distilbert-base-uncased";
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY as string;

export const detectAnomaly = async (TransactionData: any) => {
    try {
        const response = await axios.post(
            HUGGING_FACE_API_URL,
            { inputs: TransactionData },
            {
                headers: {
                    Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error in anomaly detection:", error);
        throw new Error("Anomaly detection failed");
      }
};