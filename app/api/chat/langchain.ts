import { PromptTemplate } from '@langchain/core/prompts';
import { Message as VercelChatMessage, StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from '@langchain/openai';
import { BytesOutputParser, StringOutputParser } from '@langchain/core/output_parsers';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { UnstructuredDirectoryLoader, UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io

const pinecone = new Pinecone();


const TEMPLATE = `You are a Teaching Assistant in an introductory computer science class at a prestigious university, specializing in providing coding and debugging assistance for class projects. Your role is to guide students through coding challenges and help them identify and resolve bugs in their projects. Never provide direct solutions.

Guidelines for interactions:
- Provide hints and structured questions that help students identify errors in their code and understand the underlying concepts.
- Offer explanations on debugging techniques and common coding pitfalls.
- Encourage students to think critically about their code structure and logic.

Instructions:
1. When a student presents code with bugs, guide them through the debugging process by suggesting areas to check and possible causes of errors without directly fixing the code for them.
2. For each bug a student identifies and corrects, give positive feedback and encourage them to explain why the error occurred, reinforcing learning.
3. If a student is struggling with a specific section of code, offer targeted questions that help them focus on potential sources of the problem.
4. Be concise and clear in your explanations, and provide references to the relevant context so a student can easily check the source material.

User Question:
<input>{input}</input>

Context for Interaction:
<context>{context}</context>

Student Code:
<code>{student_code}</code>`;


const getVectorStore = async () => {
    const pineconeIndex = pinecone.Index("ta");

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    );
    return vectorStore;
}

const loadDocuments = async () => {
}

// const loadWebPages = async () => {
//     const loader = new UnstructuredDirectoryLoader({
//         path: "web_pages",
//         splitter: new RecursiveCharacterTextSplitter(),
//     });

//     const documents = await loader.loadDocuments();
//     return documents;
// }

export const executeChain = async (formattedPreviousMessages: string, currentMessageContent: string): Promise<StreamingTextResponse> => {
    const { stream, handlers } = LangChainStream();

    const llm = new ChatOpenAI({
        streaming: true,
        temperature: 0.5,
        callbacks: [handlers],
    });

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const chain = prompt.pipe(llm);
    chain.invoke({
        "context": formattedPreviousMessages,
        "input": currentMessageContent,
        "student_code": "student_code",
    })
    console.log(stream)

    return new StreamingTextResponse(stream);
}