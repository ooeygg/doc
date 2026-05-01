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
        <Body className="bg-[#F4F3F1] font-sans">
          <Container className="mx-auto max-w-xl px-6 py-10">
            <Heading className="text-[#111111] m-0 font-serif text-3xl">New inquiry</Heading>
            <Text className="mt-2 text-sm text-[#5F5A54]">{submittedAt}</Text>

            <Hr className="my-6 border-[#E3E0DA]" />

            <Section>
              <Text className="m-0 text-xs uppercase tracking-widest text-[#D2A74A]">From</Text>
              <Text className="mt-1 text-base text-[#111111]">{name}</Text>
              <Text className="mt-0 text-sm text-[#5F5A54]">{email}</Text>
            </Section>

            {topic ? (
              <Section className="mt-6">
                <Text className="m-0 text-xs uppercase tracking-widest text-[#D2A74A]">Topic</Text>
                <Text className="mt-1 text-base text-[#111111]">{topic}</Text>
              </Section>
            ) : null}

            <Section className="mt-6">
              <Text className="m-0 text-xs uppercase tracking-widest text-[#D2A74A]">Message</Text>
              <Text className="mt-2 whitespace-pre-line text-base leading-relaxed text-[#111111]">{message}</Text>
            </Section>

            <Hr className="my-8 border-[#E3E0DA]" />

            <Text className="text-xs text-[#5F5A54]">
              Submitted via the contact form on drcynthiahiggins.com.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ContactInquiry
