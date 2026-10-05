import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PageHeader } from "../dashboard/ui";
import { panel } from "../dashboard/styles";

function UberApp() {
  return (
    <>
      <PageHeader
        title="Über die App"
        description="Informationen zu CargoSync, Impressum und Datenschutz."
      />
      <div className={`${panel} max-w-3xl px-5 sm:px-6`}>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer py-5 text-base font-semibold hover:no-underline">
              Über uns
            </AccordionTrigger>
            <AccordionContent className="flex  flex-col gap-4 text-balance">
              <p className="text-base">
                Das ist eine digitale Logistikplattform, die Fahrer und
                Speditionen miteinander verbindet. Unser Ziel ist es, den
                Transportprozess einfacher, transparenter und effizienter zu
                gestalten
              </p>
              <p className="text-base">
                Mit unserer App können Fahrer täglich verfügbare Aufträge sehen,
                den Status ihrer Lieferungen aktualisieren und direkt mit
                Disponenten kommunizieren. Wir glauben, dass moderne Technologie
                den Güterverkehr smarter und stressfreier machen kann – für alle
                Beteiligten.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="cursor-pointer py-5 text-base font-semibold hover:no-underline">
              Impressum
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1">
              <p className="text-base flex gap-2 dark:text-white/50">
                Name:
                <span className="text-black/70 dark:text-white">
                  Abbosbek Anvarjonov
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                Adresse:
                <span className="text-black/70 dark:text-white">
                  Ringerweg 4, 06128 Halle, Deutschland
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                E-mail:
                <span className="text-black/70 dark:text-white">
                  abbosbekanvarjonov@gmail.com
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                Telefon:
                <span className="text-black/70 dark:text-white">
                  +49 173 475 91 22
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                Verantwortlich für den Inhalt:
                <span className="text-black/70 dark:text-white">
                  Abbosbek Anvarjonov
                </span>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="cursor-pointer py-5 text-base font-semibold hover:no-underline">
              Datenschutz
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base">
                Der Schutz Ihrer persönlichen Daten ist mir wichtig. Diese
                Website dient ausschließlich der Präsentation meiner Projekte.
                Es werden keine personenbezogenen Daten erhoben, gespeichert
                oder an Dritte weitergegeben. Wenn Sie mich per E-Mail
                kontaktieren, werden Ihre Angaben nur zur Bearbeitung der
                Anfrage verwendet und anschließend gelöscht.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="cursor-pointer py-5 text-base font-semibold hover:no-underline">
              Kontakt
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-base flex gap-2 dark:text-white/50">
                E-mail:
                <span className="text-black/70 dark:text-white">
                  abbosbekanvarjonov@gmail.com
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                Telefon:
                <span className="text-black/70 dark:text-white">
                  +49 173 475 91 22
                </span>
              </p>
              <p className="text-base flex gap-2 dark:text-white/50">
                Web:
                <span className="text-black/70 dark:text-white">
                  abbosbek-anvarjonov.com
                </span>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default UberApp;
