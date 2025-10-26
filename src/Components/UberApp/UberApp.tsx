import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

function UberApp() {
  return (
    <div className="flex flex-col justify-center w-full h-full p-5 ">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl cursor-pointer">
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
          <AccordionTrigger className="text-xl cursor-pointer">
            Impressum
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <p className="text-base flex gap-2">
              Name:<span className="text-black/70"> Abbosbek Anvarjonov</span>
            </p>
            <p className="text-base flex gap-2">
              Adresse:
              <span className="text-black/70">
                Ringerweg 4, 06128 Halle, Deutschland
              </span>
            </p>
            <p className="text-base flex gap-2">
              E-mail:
              <span className="text-black/70">
                abbosbekanvarjonov@gmail.com
              </span>
            </p>
            <p className="text-base flex gap-2">
              Telefon: <span className="text-black/70">+49 173 475 91 22</span>
            </p>
            <p className="text-base flex gap-2">
              Verantwortlich für den Inhalt:
              <span className="text-black/70">Abbosbek Anvarjonov</span>
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl cursor-pointer">
            Datenschütz
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-base">
              Der Schutz Ihrer persönlichen Daten ist mir wichtig. Diese Website
              dient ausschließlich der Präsentation meiner Projekte. Es werden
              keine personenbezogenen Daten erhoben, gespeichert oder an Dritte
              weitergegeben. Wenn Sie mich per E-Mail kontaktieren, werden Ihre
              Angaben nur zur Bearbeitung der Anfrage verwendet und anschließend
              gelöscht.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl cursor-pointer">
            Kontakt
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-base flex gap-2">
              E-mail:
              <span className="text-black/70">
                abbosbekanvarjonov@gmail.com
              </span>
            </p>
            <p className="text-base flex gap-2">
              Telefon: <span className="text-black/70">+49 173 475 91 22</span>
            </p>
            <p className="text-base flex gap-2">
              Web:{' '}
              <span className="text-black/70">abbosbek-anvarjonov.com</span>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default UberApp;
