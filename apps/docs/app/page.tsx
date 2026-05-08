import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="title-16-bold text-default">
          Huxley UI
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/docs"
            className="body-14-medium text-subtle transition-colors hover:text-default"
          >
            Docs
          </Link>
          <Link
            href="/playground"
            className="body-14-medium text-subtle transition-colors hover:text-default"
          >
            Playground
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="title-32-bold text-default">Huxley UI</h1>
          <p className="mt-4 body-16-regular text-subtle">
            디자인 시스템 기반 컴포넌트 + AI Playground
          </p>
          <p className="mt-2 body-14-regular text-subtlest">
            자연어로 UI를 설명하면 컴포넌트 조합을 생성합니다
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/docs"
              className="bg-brand-default hover:bg-brand-hovered inline-flex h-10 items-center justify-center rounded-lg px-6 body-14-medium text-inverse transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/playground"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-default px-6 body-14-medium text-default transition-colors hover:bg-interaction-hovered"
            >
              Playground
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
