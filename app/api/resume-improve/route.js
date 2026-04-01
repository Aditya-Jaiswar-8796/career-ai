import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function POST(request) {
  try {
    const { section, original, resumeText } = await request.json()

    if (!section || !original) {
      return Response.json(
        { error: 'section and original are required' },
        { status: 400 }
      )
    }
    console.log("section: ", section)
    console.log("original: ", original)
    console.log("resumeText: ", resumeText) 
    const modelId = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
    const model = google(modelId)

    const prompt = `You are an expert resume writer.
Improve the given resume section text to be more impactful, concise, ATS-friendly, and achievement-oriented.

Resume context:
${resumeText || ''}

Target section: ${section}
Original text: ${original}

Rules:
- Return only improved section text (no markdown, no bullets unless section naturally needs it)
- Keep the meaning truthful
- Prefer measurable outcomes and strong action verbs
- Keep length close to original unless clarity requires expansion`

    const { text } = await generateText({
      model,
      prompt
    })
    console.log("text: ", text)
    return Response.json({ improvedText: text?.trim() || original })
  } catch (error) {
    console.error("FULL ERROR:", error)
    return Response.json(
      { error: 'Failed to generate improved text', details: String(error?.message || error) },
      { status: 500 }
    )
  }
}
