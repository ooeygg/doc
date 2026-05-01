import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Tailwind, Text } from "@react-email/components"

export interface ContactInquiryProps {
  name: string
  email: string
  topic?: string
  message: string
  submittedAt: string
}

export function ContactInquiry({ name, email, topic, message, submittedAt }: ContactInquiryProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New inquiry from ${name}`}</Preview>
      <Tailwind>
        <Body className="bg-[#f7f3ec] font-sans">
          <Container className="mx-auto max-w-xl px-6 py-10">
            <Heading className="text-[#0f3a2e] m-0 font-serif text-3xl">New inquiry</Heading>
            <Text className="mt-2 text-sm text-[#14201c] opacity-70">{submittedAt}</Text>

            <Hr className="my-6 border-[#ebe6dc]" />

            <Section>
              <Text className="m-0 text-xs uppercase tracking-widest text-[#b89255]">From</Text>
              <Text className="mt-1 text-base text-[#14201c]">{name}</Text>
              <Text className="mt-0 text-sm text-[#14201c] opacity-70">{email}</Text>
            </Section>

            {topic ? (
              <Section className="mt-6">
                <Text className="m-0 text-xs uppercase tracking-widest text-[#b89255]">Topic</Text>
                <Text className="mt-1 text-base text-[#14201c]">{topic}</Text>
              </Section>
            ) : null}

            <Section className="mt-6">
              <Text className="m-0 text-xs uppercase tracking-widest text-[#b89255]">Message</Text>
              <Text className="mt-2 whitespace-pre-line text-base leading-relaxed text-[#14201c]">{message}</Text>
            </Section>

            <Hr className="my-8 border-[#ebe6dc]" />

            <Text className="text-xs text-[#14201c] opacity-50">
              Submitted via the contact form on drcynthiahiggins.com.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ContactInquiry
