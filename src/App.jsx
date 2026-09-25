import { useEffect, useId, useRef, useState } from "react";

const CLIPS = [`${import.meta.env.BASE_URL}hero.mp4`, `${import.meta.env.BASE_URL}hero-2.mp4`];

const NAV = [
  ["Sobre", "#sobre"],
  ["Atuação", "#atuacao"],
  ["Serviços", "#servicos"],
  ["FAQ", "#faq"],
  ["Contato", "#contato"],
];

const AREAS = [
  ["Importação", "Entrada de mercadorias com despacho orientado à operação."],
  ["Exportação", "Preparação e condução de embarques para o mercado externo."],
  ["Transporte marítimo", "Coordenação com armadores e terminais alfandegados."],
  ["Transporte rodoviário", "Ligação da carga entre porto, aeroporto e destino."],
  ["Transporte aéreo", "Cargas que pedem prazo curto e controle de terminal."],
  ["Mudança e bagagem", "Mudança internacional e bagagem desacompanhada."],
];

const SERVICES = [
  ["Assessoria aduaneira", "Orientação ao longo do despacho."],
  ["Trânsito aduaneiro", "Movimentação entre recintos com controle."],
  ["Admissão temporária", "Entrada por prazo determinado."],
  ["Trâmites", "Procedimentos junto aos órgãos anuentes."],
  ["Radar", "Habilitação para operar no Siscomex."],
  ["Drawback", "Suspensão ou isenção ligada à exportação."],
  ["Carga projeto", "Volumes fora do padrão e de grande porte."],
  ["Despacho aduaneiro", "Liberação de importação e exportação."],
  ["Entreposto aduaneiro", "Armazenagem em regime especial."],
  ["Reexportação", "Retorno ao exterior de mercadoria importada."],
  ["Classificação fiscal", "Enquadramento fiscal da mercadoria."],
  ["Logística aeroportuária", "Coordenação da carga no modal aéreo."],
];

const FAQ = [
  [
    "Quem pode exportar?",
    "Todas as empresas que possuem o Registro da Habilitação no Ambiente de Registro e Rastreamento da Atuação dos Intervenientes Aduaneiros (Radar) estão habilitadas a operar no comércio exterior brasileiro. Porém, isso não é suficiente. A empresa precisa se preparar, planejando as ações necessárias para sua exportação. A obtenção do Radar é, portanto, um dos passos para a exportação de produtos e serviços.",
  ],
  [
    "Por que exportar?",
    "São muitos os benefícios obtidos pelas empresas no processo de exportação de seus produtos. Dentre os principais, pode-se citar: aumento de produtividade e competitividade com as vendas para o mercado externo; intercâmbio de tecnologia e know-how; incremento na qualidade de seus produtos e serviços para aceitação internacional; e contribuição para o superávit da balança comercial.",
  ],
  [
    "Há riscos numa exportação?",
    "Exportar também é diluir riscos e evitar instabilidade. Ao optar por vender seus produtos em mercados externos, o empresário diminui o risco dos negócios visto que a expansão da empresa não fica inteiramente condicionada pelo ritmo de crescimento da economia brasileira e de mudanças na política econômica. Além disso, a diluição dos riscos abre a possibilidade de planejamento de longo prazo, garante maior segurança na tomada de decisões e assegura receitas em moeda forte.",
  ],
  [
    "O que é o Radar?",
    "Registro da Habilitação no Ambiente de Registro e Rastreamento da Atuação dos Intervenientes Aduaneiros (RADAR), para habilitar pessoa física responsável por pessoa jurídica importadora, exportadora ou internadora da Zona Franca de Manaus (ZFM), no Sistema Integrado de Comércio Exterior (SISCOMEX) e o credenciamento dos respectivos representantes para a prática de atividades relacionadas com o despacho aduaneiro. O Radar credencia os operadores do comércio exterior a realizar suas operações de exportação ou de importação através do SISCOMEX.",
  ],
];

function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }
  if (name === "close") {
    return (
      <svg {...common}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.13-.95-.3-1.64-.59-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39.85-.39h.61c.2 0 .46-.07.72.55.27.64.91 2.22.99 2.38.08.16.13.35.03.56-.1.21-.15.34-.3.52-.15.18-.31.4-.45.54-.15.15-.3.31-.13.6.16.29.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.61-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.64-.14.26.08 1.64.77 1.92.91.28.14.46.21.53.33.07.12.07.68-.17 1.36z"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function App() {
  const videosRef = useRef(null);
  const [clip, setClip] = useState(0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const root = videosRef.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = () => [...root.querySelectorAll("video")];
    const apply = () => {
      videos().forEach((video, index) => {
        const active = !media.matches && index === clip;
        if (active) video.play().catch(() => {});
        else video.pause();
      });
    };
    apply();
    if (media.matches) return () => media.removeEventListener("change", apply);
    const timer = window.setInterval(() => {
      setClip((current) => (current + 1) % CLIPS.length);
    }, 9000);
    media.addEventListener("change", apply);
    return () => {
      window.clearInterval(timer);
      media.removeEventListener("change", apply);
    };
  }, [clip]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  function submitLead(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nome = String(data.get("nome") || "").trim();
    const empresa = String(data.get("empresa") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();
    const text = `Olá, SUPLOG. Meu nome é ${nome}${empresa ? `, da ${empresa}` : ""}. ${mensagem}`;
    window.open(
      `https://wa.me/5581973240284?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <>
      <a className="skip" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className={scrolled ? "nav is-solid" : "nav"}>
        <a className="nav__logo" href="#topo" aria-label="SUPLOG, início">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="250" height="98" />
        </a>
        <nav className="nav__links" aria-label="Seções">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn--gold nav__cta" href="#contato">
          Fale conosco
        </a>
        <button
          className="nav__burger"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </header>

      <div
        id={menuId}
        className={open ? "drawer is-open" : "drawer"}
        hidden={!open}
      >
        {NAV.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn btn--gold" href="#contato" onClick={() => setOpen(false)}>
          Fale conosco
        </a>
      </div>

      <main id="conteudo">
        <section className="hero" id="topo">
          <div className="hero__videos" ref={videosRef}>
            {CLIPS.map((src, index) => (
              <video
                key={src}
                className={index === clip ? "hero__video is-active" : "hero__video"}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >
                <source src={src} type="video/mp4" />
              </video>
            ))}
          </div>
          <div className="hero__shade" />
          <div className="hero__copy">
            <p className="kicker">Recife · Comércio exterior</p>
            <h1>
              <span className="hero__eyebrow">Excelência em</span>
              <span>Importação</span>
              <span>e exportação</span>
            </h1>
            <p className="hero__lead">
              Importação ou exportação, a SUPLOG trabalha com o objetivo de
              garantir o sucesso de suas operações.
            </p>
            <div className="hero__actions">
              <a className="btn btn--gold" href="#contato">
                Pedir análise sem custo
              </a>
              <a className="btn btn--ghost" href="#servicos">
                Ver serviços
              </a>
            </div>
          </div>
        </section>

        <section className="section about reveal" id="sobre">
          <div className="section__head">
            <p className="kicker">A empresa</p>
            <h2>Sobre a SUPLOG</h2>
          </div>
          <div className="about__grid">
            <p>
              Com vasta experiência de mercado, a SUPLOG desenvolveu alianças
              com terminais alfandegados, armadores, companhias aéreas, agentes
              de carga, transportadores rodoviários e tradings, nos tornando
              aptos a oferecer um serviço de qualidade.
            </p>
            <p>
              Compreendemos as necessidades e as individualidades dos
              importadores e exportadores. Por isso, o despacho aduaneiro é
              direcionado para cada operação.
            </p>
            <p>
              Atualizados com as mudanças do comércio exterior em todas as
              modalidades, contamos com uma equipe qualificada e focada, o que
              garante aos clientes e parceiros um atendimento diferencial e
              exclusivo.
            </p>
          </div>
        </section>

        <section className="band">
          <p>Sua empresa faz os despachos aduaneiros em conformidade com as normas legais?</p>
          <a className="btn btn--gold" href="#contato">
            Nos pergunte como
          </a>
        </section>

        <section className="section reveal" id="atuacao">
          <div className="section__head">
            <p className="kicker">Onde atuamos</p>
            <h2>Áreas de atuação</h2>
          </div>
          <ul className="areas">
            {AREAS.map(([title, text], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
          <p className="note">
            Sugerimos ajustes no processo de importação e exportação para
            reduzir riscos e melhorar prazos e custos logísticos e tributários.
          </p>
        </section>

        <section className="section section--raise reveal" id="servicos">
          <div className="section__head">
            <p className="kicker">O que fazemos</p>
            <h2>Serviços</h2>
          </div>
          <ul className="services">
            {SERVICES.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="offer reveal">
          <p className="kicker">Sem custo</p>
          <h2>Análise da sua operação de comércio exterior</h2>
          <p>
            Olhamos compliance legal, cambial, fiscal e tributário. A leitura
            é feita para os nossos clientes, sem custo.
          </p>
          <a className="btn btn--gold" href="#contato">
            Solicitar a análise
          </a>
        </section>

        <section className="section reveal" id="faq">
          <div className="section__head">
            <p className="kicker">Dúvidas</p>
            <h2>Perguntas frequentes</h2>
          </div>
          <div className="faq">
            {FAQ.map(([question, answer], index) => {
              const expanded = faqOpen === index;
              return (
                <article key={question} className={expanded ? "is-open" : ""}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setFaqOpen(expanded ? -1 : index)}
                    >
                      <span>
                        {index + 1}. {question}
                      </span>
                      <Icon name="chevron" />
                    </button>
                  </h3>
                  {expanded && <p>{answer}</p>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="band band--quiet">
          <p>
            Nosso maior objetivo tem sido a prestação de serviços com
            qualidade, sempre com o mesmo nível, independente da ascendência e
            de acordo com as necessidades de mercado.
          </p>
        </section>

        <section className="section contact reveal" id="contato">
          <div className="section__head">
            <p className="kicker">Fale com a equipe</p>
            <h2>Contato</h2>
          </div>
          <div className="contact__grid">
            <form className="form" onSubmit={submitLead}>
              <label>
                Nome
                <input name="nome" type="text" required autoComplete="name" />
              </label>
              <label>
                Empresa
                <input name="empresa" type="text" autoComplete="organization" />
              </label>
              <label>
                Mensagem
                <textarea name="mensagem" rows="5" required />
              </label>
              <button className="btn btn--gold" type="submit">
                Enviar pelo WhatsApp
              </button>
              <p className="form__hint">
                A mensagem abre no WhatsApp do comercial, no número (81)
                97324-0284.
              </p>
            </form>

            <div className="contact__facts">
              <div>
                <h3>Endereço</h3>
                <p>
                  Edifício Cervantes, sala 106
                  <br />
                  Rua Capitão José da Luz, nº 137
                  <br />
                  Coelhos, Recife — PE
                  <br />
                  50070-540
                </p>
                <a
                  href="https://maps.app.goo.gl/6kUBS7b6PC7FTDmn7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir no Google Maps
                </a>
              </div>
              <div>
                <h3>Telefones</h3>
                <p>
                  <a href="tel:+558121560885">+55 81 2156-0885</a>
                  <br />
                  <a href="tel:+5581973240284">+55 81 97324-0284</a>
                </p>
              </div>
              <div>
                <h3>E-mail</h3>
                <p>
                  <a href="mailto:johnkelly@suplog.com.br">johnkelly@suplog.com.br</a>
                  <br />
                  <a href="mailto:comercial@suplog.com.br">comercial@suplog.com.br</a>
                </p>
              </div>
              <div>
                <h3>Funcionamento</h3>
                <p>
                  Segunda a sexta, 9h às 18h
                  <br />
                  Sábado e domingo, fechado
                </p>
              </div>
              <div>
                <h3>Redes</h3>
                <p>
                  <a href="https://www.instagram.com/_suplog/" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <br />
                  <a
                    href="https://www.facebook.com/suplog.exportacao.9"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        className="wa"
        href="https://wa.me/5581973240284"
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar a SUPLOG no WhatsApp"
      >
        <Icon name="whatsapp" />
      </a>

      <footer className="footer">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" width="250" height="98" />
        <p>SUPLOG · Recife — PE</p>
        <p className="footer__credit">
          Vídeos de fundo, licença livre:{" "}
          <a
            href="https://www.pexels.com/video/aerial-view-of-container-ship-at-port-29903737/"
            target="_blank"
            rel="noreferrer"
          >
            navio no porto
          </a>
          {" e "}
          <a href="https://www.pexels.com/video/29927895/" target="_blank" rel="noreferrer">
            segundo plano do porto
          </a>
          , Pexels.
        </p>
      </footer>
    </>
  );
}
