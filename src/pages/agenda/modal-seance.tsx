import { PlayIcon, PlusIcon, SaveIcon, UploadIcon } from "lucide-react";
import React, {useRef} from "react";
import { Button } from "../../components/ui/button.tsx";
import { Card, CardContent } from "../../components/ui/card.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";
import { Textarea } from "../../components/ui/textarea.tsx";

export const ModalSeance = (): React.JSX.Element => {
    const formFields = [
        {
            id: "titre",
            label: "Titre de la séance",
            placeholder: "Titre de la séance",
            type: "input",
        },
        {
            id: "but",
            label: "But de la séance",
            placeholder: "Thème situation",
            type: "input",
        },
        {
            id: "objectifs",
            label: "Objectifs",
            placeholder: "Objectif de la séance",
            type: "textarea",
        },
    ];

    const numberFields = [
        {
            id: "effectifs",
            label: "Effectifs",
            placeholder: "Nombre de joueurs",
        },
        {
            id: "duree",
            label: "Durée",
            placeholder: "Durée en minutes",
        },
    ];

    const additionalFields = [
        {
            id: "terrain",
            label: "Terrain",
            placeholder: "Type de terrain",
            type: "input",
        },
        {
            id: "materiel",
            label: "Matériel",
            placeholder: "Matériel nécessaire",
            type: "input",
        },
    ];

    const textareaFields = [
        {
            id: "lancement",
            label: "Lancement",
            placeholder: "Description du lancement ...",
        },
        {
            id: "consignes",
            label: "Consignes",
            placeholder: "Consignes à donner...",
        },
        {
            id: "attendus",
            label: "Attendus",
            placeholder: "Résultats attendus...",
        },
        {
            id: "evolution",
            label: "Evolution",
            placeholder: "Evolutions possibles...",
        },
    ];
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Fichier sélectionné :", file.name);
        }
    };

    return (
        <div className="flex flex-col items-end gap-5 p-5 relative bg-white" data-model-id="92:105">
            <header className="flex min-w-[300px] items-start justify-between relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "200ms" } as React.CSSProperties}>
                <h1 className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-light text-black text-xl tracking-[0] leading-[normal]">
                    Nouvelle Séance
                </h1>
            </header>
            <main className="flex items-start gap-[16px_16px] px-0 py-2.5 relative self-stretch w-full flex-[0_0_auto] overflow-y-scroll">
                <section className="flex flex-col min-w-[300px] items-start gap-[5px] pt-[63px] pb-0 px-0 relative flex-1 grow">
                    <div className="flex flex-col w-full items-start gap-0.5 absolute top-0 left-0 translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "400ms" } as React.CSSProperties}>
                        <Label className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                            Thématique
                        </Label>
                        <Input defaultValue="" placeholder="Ex: Ballon + jeu avant contact" className="flex h-[35px] items-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                    </div>
                    {formFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: `${600 + index * 200}ms` } as React.CSSProperties}>
                            <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                                {field.label}
                            </Label>
                            {field.type === "input" ? (
                                <Input defaultValue="" placeholder={field.placeholder} className="flex h-[35px] items-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                            ) : (
                                <Textarea defaultValue="" placeholder={field.placeholder} className="flex h-[50px] items-start gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df] resize-none"/>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-wrap items-center gap-[48px_5px] relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "1200ms" } as React.CSSProperties}>
                        {numberFields.map((field) => (
                            <div key={field.id} className="flex flex-col items-start gap-0.5 relative flex-1 grow">
                                <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                                    {field.label}
                                </Label>
                                <Input type="number" min="0" defaultValue="" placeholder={field.placeholder} className="flex h-[35px] items-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-[48px_5px] relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "1400ms" } as React.CSSProperties}>
                        {additionalFields.map((field) => (
                            <div key={field.id} className="flex flex-col items-start gap-0.5 relative flex-1 grow">
                                <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">{field.label}
                                </Label>
                                <Input defaultValue="" placeholder={field.placeholder} className="flex h-[35px] items-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                            </div>
                        ))}
                    </div>
                    {textareaFields.map((field, index) => (
                        <div key={field.id} className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: `${1600 + index * 200}ms` } as React.CSSProperties}>
                            <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                                {field.label}
                            </Label>
                            <Textarea defaultValue="" placeholder={field.placeholder} className="flex h-[50px] items-start gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df] resize-none"/>
                        </div>
                    ))}
                </section>
                <aside className="flex flex-col min-w-[300px] items-end justify-center gap-[30px] relative flex-1 grow">
                    <Card className="flex flex-col items-center justify-center gap-2.5 px-5 py-[50px] relative self-stretch w-full flex-[0_0_auto] bg-[#fbfbfb] rounded-[15px] border-0 translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "2400ms" } as React.CSSProperties}>
                        <CardContent className="flex flex-col w-[147px] items-center gap-[17px] relative flex-[0_0_auto] p-0">
                            <img className="relative w-[84px] h-[57.75px]"  alt="Vector" src="https://c.animaapp.com/mevvdi00lgxkZ7/img/vector.svg"/>
                            <h3 className="relative self-stretch [font-family:'Poppins',Helvetica] font-semibold text-[#d10053] text-base text-center tracking-[0] leading-[normal]">
                                Entrez vos images
                            </h3>
                        </CardContent>
                        <p className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-[#979797] text-sm text-center tracking-[0] leading-[normal]">
                            SVG, PNG,JPG ou GIF (Max 800x400px)
                            <br />
                            Fichier Word, PPT, PDF (Max 100Mo)
                        </p>
                        <input type="file" accept="image/*,.pdf,.doc,.docx,.ppt,.pptx" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange}/>
                        <Button onClick={handleUploadClick} className="flex w-60 items-center justify-between pl-[27px] pr-2 py-2 relative flex-[0_0_auto] rounded-[28px] border-2 border-solid border-[#ddb8c7] bg-transparent hover:bg-[#ddb8c7]/10 h-auto">
                              <span className="relative w-fit [font-family:'Poppins',Helvetica] font-medium text-black text-sm text-center tracking-[0] leading-[normal]">
                                Ajouter un fichier joint
                              </span>
                            <UploadIcon className="relative w-[41px] h-[41px] text-black" />
                        </Button>
                    </Card>
                    <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "2600ms" } as React.CSSProperties}>
                        <div className="flex flex-col items-start gap-0.5 relative self-stretch w-full flex-[0_0_auto]">
                            <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                                Lien vidéo
                            </Label>
                            <Input defaultValue="" placeholder="Lien vidéo" className="flex h-[35px] items-center gap-2.5 px-2.5 py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-[#black] text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                        </div>
                        <Card className="flex flex-col h-[210px] items-center justify-center gap-2.5 px-0 py-2.5 relative self-stretch w-full bg-neutral-50 rounded-[15px] border-0">
                            <CardContent className="flex flex-col items-center gap-2.5 p-0">
                                <PlayIcon className="relative w-[75px] h-[67px] text-[#d10053]" />
                                <p className="relative w-fit [font-family:'Poppins',Helvetica] font-medium text-[#d10053] text-sm text-center tracking-[0] leading-[normal]">
                                    L&apos;aperçu de la vidéo apparaîtra ici
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="inline-flex flex-col items-end gap-2.5 relative flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0" style={{ animationDelay: "2800ms" } as React.CSSProperties}>
                        <Button className="inline-flex items-center justify-center gap-2.5 px-5 py-[9px] relative flex-[0_0_auto] bg-[#5e81ff] rounded-[21px] hover:bg-[#5e81ff]/90 h-auto">
                            <SaveIcon className="relative w-[23px] h-[15px] text-white" />
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
                                Enregistrer la séance
                            </span>
                        </Button>
                        <Button className="inline-flex items-center justify-center gap-2.5 px-5 py-[9px] relative flex-[0_0_auto] bg-[#d10053] rounded-[21px] hover:bg-[#d10053]/90 h-auto">
                            <PlusIcon className="relative w-[13px] h-3.5 text-white" />
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
                                    Ajouter un autre séance
                            </span>
                        </Button>
                    </div>
                </aside>
            </main>
        </div>
    );
};