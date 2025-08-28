import { CheckIcon, XIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Label } from "../../components/ui/label.tsx";

const colorOptions = [
    { color: "bg-green-500", className: "bg-green-500" },
    { color: "bg-green-700", className: "bg-green-700" },
    { color: "bg-red-500", className: "bg-red-500" },
    { color: "bg-pink-500", className: "bg-pink-500" },
    { color: "bg-yellow-400", className: "bg-yellow-400" },
    { color: "bg-blue-400", className: "bg-blue-400" },
    { color: "bg-green-400", className: "bg-green-400" },
    { color: "bg-red-600", className: "bg-red-600" },
    { color: "bg-blue-500", className: "bg-blue-500" },
    { color: "bg-green-300", className: "bg-green-300" },
    { color: "bg-red-400", className: "bg-red-400" },
    { color: "bg-amber-800", className: "bg-amber-800" },
];

export const Frame = (): React.JSX.Element => {
    return (
        <div className="flex flex-col items-end gap-5 p-5 relative bg-white rounded-lg">
            <header className="flex min-w-[300px] items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                <h1 className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-light text-black text-xl tracking-[0] leading-[normal]">
                    Nouvelle thématique
                </h1>
                <Button variant="ghost" size="icon" className="relative w-[29px] h-[29px] p-0 hover:bg-gray-100 transition-colors">
                    <XIcon className="w-5 h-5" />
                </Button>
            </header>
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <Label className="relative self-stretch mt-[-1.00px] [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                    Thématique
                </Label>
                <Input defaultValue="" placeholder="Nouvelle thématique" className="flex flex-col h-[35px] items-start justify-around gap-2.5 pl-2.5 pr-[18px] py-[5px] relative self-stretch w-full bg-[#fefefe] rounded-[5px] border border-solid border-[#efefef] [font-family:'Poppins',Helvetica] font-normal text-sm text-left tracking-[0] leading-[normal] placeholder:text-[#ecd6df]"/>
                <Label className="relative self-stretch [font-family:'Poppins',Helvetica] font-normal text-black text-sm tracking-[0] leading-[normal]">
                    Choisir couleur
                </Label>
                <div className="grid grid-cols-4 gap-2 w-[137px]">
                    {colorOptions.map((colorOption, index) => (
                        <button key={index} className={`w-6 h-6 rounded-full ${colorOption.className} hover:scale-110 transition-transform cursor-pointer border border-gray-200`} onClick={() => {}}/>
                    ))}
                </div>
            </div>
            <Button className="inline-flex items-center justify-center gap-2.5 px-5 py-[9px] relative flex-[0_0_auto] bg-[#5e81ff] rounded-[21px] h-auto hover:bg-[#4c6eef] transition-colors">
                <CheckIcon className="relative w-[26px] h-[18.61px] ml-[-1.50px]" />
                <span className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
                  Enregistre
                </span>
            </Button>
        </div>
    );
};