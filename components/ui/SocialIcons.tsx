export function IconLinkedin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.12 1 2.5 1C3.88 1 4.98 2.12 4.98 3.5ZM0.24 8.98H4.76V24H0.24V8.98ZM8.98 8.98H13.04V10.76H13.12C13.82 9.64 15.48 8.4 17.78 8.4C22.04 8.4 24 10.78 24 15.1V24H19.48V15.98C19.48 13.6 18.96 11.56 16.4 11.56C13.8 11.56 13.16 13.34 13.16 15.66V24H8.64V8.98H8.98Z" />
    </svg>
  )
}

export function IconYoutube({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.88 3.5 12 3.5 12 3.5s-7.88 0-9.38.58A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12c1.5.58 9.38.58 9.38.58s7.88 0 9.38-.58A3 3 0 0 0 23.5 17.8c.33-1.96.5-4 .5-5.8s-.17-3.84-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  )
}

export function IconFacebook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M22.68 0H1.32A1.32 1.32 0 0 0 0 1.32v21.36A1.32 1.32 0 0 0 1.32 24h11.5v-9.29H9.69V11.1h3.13V8.41c0-3.1 1.9-4.8 4.67-4.8 1.33 0 2.47.1 2.8.14v3.24h-1.92c-1.51 0-1.8.72-1.8 1.77v2.33h3.6l-.47 3.61h-3.13V24h6.13A1.32 1.32 0 0 0 24 22.68V1.32A1.32 1.32 0 0 0 22.68 0z" />
    </svg>
  )
}

export function IconExternal({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  )
}

export default IconLinkedin
