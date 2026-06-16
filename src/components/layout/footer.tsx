import { Container } from './container'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} 웨딩 비용 정리 블로그. Powered by Notion CMS.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
