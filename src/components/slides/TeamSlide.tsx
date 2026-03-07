import AnimateIn from "@/components/ui/AnimateIn";

const team = [
  {
    name: "Alexander Grosse",
    role: "Strategie & Skalierung",
    bio: "Ex BCG Digital Ventures. CTO/CPTO bei Issuu (100M Nutzer) und Veo Technologies. Ex SoundCloud, Ex Nokia. Co-Author 'Scaling Teams' (O'Reilly). Hat Engineering-Teams von 10 auf 150+ skaliert.",
    linkedin: "https://www.linkedin.com/in/alexandergrosse/",
    photo: "/team/alexander-grosse.jpg",
    initials: "AG",
  },
  {
    name: "Piotr Zwolinski",
    role: "Technologie & Umsetzung",
    bio: "20+ Jahre Software-Entwicklung. Gründer DevMeetings (30.000+ Entwickler, 50+ Städte, 15 Jahre). 13 Jahre ERP-Systeme bei PLAN Solutions — 200+ Unternehmenskunden. Co-Founder Fluffy Labs (AI-Infrastruktur).",
    linkedin: "https://www.linkedin.com/in/piotrzwolinski/",
    photo: "/team/piotr-zwolinski.jpg",
    initials: "PZ",
  },
];

const logos = [
  "BCG Digital Ventures",
  "SoundCloud",
  "Nokia",
  "Issuu",
  "Veo Technologies",
  "O'Reilly Media",
];

export default function TeamSlide() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            Wer dahinter steht
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Zwei Gründer. 40+ Jahre Software.
          </h2>
          <p className="text-lg text-neutral-500 mb-12">
            Keine Berater mit PowerPoint. Software-Leute, die wissen wie
            Development funktioniert.
            <br />
            Wir haben Produkte gebaut, Teams skaliert, Legacy-Code migriert.
            Jetzt helfen wir Ihrem Team, AI-first zu arbeiten.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {team.map((person, i) => (
            <AnimateIn key={person.name} delay={i * 150}>
              <div className="border border-neutral-200 rounded-2xl p-8 h-full hover:border-neutral-400 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-14 h-14 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold shrink-0">
                      {person.initials}
                    </div>
                  )}
                  <div>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-xl hover:underline"
                    >
                      {person.name}
                    </a>
                    <div className="text-sm text-neutral-500">{person.role}</div>
                  </div>
                </div>
                <p className="text-neutral-600 leading-relaxed">{person.bio}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={400}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
            <span className="text-xs uppercase tracking-widest">
              Erfahrung aus:
            </span>
            {logos.map((logo) => (
              <span key={logo} className="font-medium text-neutral-500">
                {logo}
              </span>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
