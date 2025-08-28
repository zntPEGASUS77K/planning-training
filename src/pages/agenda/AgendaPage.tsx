import React, { useState, useMemo } from "react";
import {
    CalendarIcon,
    MenuIcon,
    PlusIcon,
    SearchIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    XIcon,
    CheckIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import { Input } from "../../components/ui/input.tsx";
import { Card, CardContent } from "../../components/ui/card.tsx";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../../components/ui/navigation-menu.tsx";
import { Frame } from "./modal-thematique.tsx";
import { ModalSeance } from "./modal-seance.tsx";

// Utility function to generate calendar days
const getCalendarDays = (month: string, year: number) => {
    const monthIndex = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ].indexOf(month);

    // Create a date for the first day of the month
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0); // Last day of the month
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate days from previous month to fill the grid
    const prevMonthDays = [];
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevMonthYear = monthIndex === 0 ? year - 1 : year;
    const lastDayPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push({
            day: lastDayPrevMonth - i,
            isWeekend: (i % 7 === 0 || i % 7 === 6),
            events: [],
            isOtherMonth: true,
        });
    }

    // Calculate days for the current month
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        isWeekend: (firstDayOfWeek + i) % 7 === 0 || (firstDayOfWeek + i) % 7 === 6,
        events: [],
        isOtherMonth: false,
    }));

    // Calculate days from next month to fill the grid
    const nextMonthDays = [];
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingDays = 42 - totalDays; // Assuming a 6x7 grid
    for (let i = 1; i <= remainingDays; i++) {
        nextMonthDays.push({
            day: i,
            isWeekend: (totalDays + i - 1) % 7 === 0 || (totalDays + i - 1) % 7 === 6,
            events: [],
            isOtherMonth: true,
        });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export const AgendaPage = (): React.JSX.Element => {
    const [isThematicModalOpen, setIsThematicModalOpen] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
    const [hoveredCell, setHoveredCell] = useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = useState("Juillet");
    const [selectedYear, setSelectedYear] = useState(2025);

    const navigationItems = [
        { label: "Annuelle", href: "#", isActive: true },
        { label: "Consulter", href: "#" },
        { label: "Entrainements", href: "#" },
        { label: "Académie", href: "#" },
        { label: "Individuel", href: "#" },
    ];

    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ].map(name => ({ name, isSelected: selectedMonth === name }));

    const weekDays = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    // Generate calendar days using useMemo to optimize performance
    const calendarDays = useMemo(() => getCalendarDays(selectedMonth, selectedYear), [selectedMonth, selectedYear]);

    const themeFilters = [
        { color: "#ffe572", label: "Collectif/ Fitness game" },
        { color: "#5e81ff", label: "Ballon" },
        { color: "#8a38f5", label: "Plaquage" },
        { color: "#00781e", label: "Défense fort" },
        { color: "#6be88a", label: "Relance jeu" },
        { color: "#ff903c", label: "Contest" },
        { color: "#00d7f8", label: "Collectif total" },
        { color: "#ff89cc", label: "Conquete" },
        { color: "#ff6b6b", label: "Jeu au sol" },
        { color: "#00a9c4", label: "CA" },
        { color: "#fff8d6", label: "Animation OFF" },
        { color: "#6b4226", label: "Animation DEF" },
        { color: "#5300c0", label: "Jeu avant contact" },
        { color: "#000000", label: "Duel" },
    ];

    const openThematicModal = () => setIsThematicModalOpen(true);
    const closeThematicModal = () => setIsThematicModalOpen(false);
    const openSessionModal = () => setIsSessionModalOpen(true);
    const closeSessionModal = () => setIsSessionModalOpen(false);

    // Handle month navigation
    const handlePrevMonth = () => {
        const monthIndex = months.findIndex(m => m.name === selectedMonth);
        if (monthIndex === 0) {
            setSelectedMonth("Décembre");
            setSelectedYear(year => year - 1);
        } else {
            setSelectedMonth(months[monthIndex - 1].name);
        }
    };

    const handleNextMonth = () => {
        const monthIndex = months.findIndex(m => m.name === selectedMonth);
        if (monthIndex === 11) {
            setSelectedMonth("Janvier");
            setSelectedYear(year => year + 1);
        } else {
            setSelectedMonth(months[monthIndex + 1].name);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2.5 px-2.5 py-5 relative bg-white" data-model-id="207:2118">
            <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] w-full">
                <div className="flex flex-col items-start gap-7 relative self-stretch w-full flex-[0_0_auto] bg-white translate-y-[-1rem] animate-fade-in opacity-0">
                    <header className="flex items-center justify-between w-full py-4 px-6 bg-white">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border-4 border-black"></div>
                            <div className="text-4xl font-semibold font-['Poppins']">LOGO</div>
                        </div>
                        <NavigationMenu className="hidden md:flex">
                            <NavigationMenuList className="flex gap-6">
                                {navigationItems.map((item) => (
                                    <NavigationMenuItem key={item.label}>
                                        {item.isActive ? (
                                            <a className="inline-flex items-center justify-end gap-2.5 border-b-2 border-[#d10053] py-1 px-2" href={item.href}>
                                                <div className="font-['Poppins'] font-normal text-lg">{item.label}</div>
                                            </a>
                                        ) : (
                                            <NavigationMenuLink href={item.href} className="inline-flex items-center justify-center gap-2.5 py-1 px-2 hover:border-b-2 hover:border-[#d10053] transition-all duration-200">
                                                <div className="font-['Poppins'] font-normal text-lg">{item.label}</div>
                                            </NavigationMenuLink>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <MenuIcon className="w-6 h-6" />
                        </Button>
                    </header>
                    <section className="flex flex-wrap items-start justify-between gap-[28px_28px] relative self-stretch w-full flex-[0_0_auto] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                        <div className="flex min-w-[400px] items-center gap-2.5 px-[30px] py-0 relative flex-1 grow">
                            <h1 className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-light text-[#d10053] text-2xl text-center tracking-[0] leading-[normal]">
                                Planification annuelle
                            </h1>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center">
                                <Input placeholder="Rechercher" className="border-0 bg-neutral-50 rounded-l-[20px] text-[17px] font-normal text-[#e0b8c8] placeholder:text-[#e0b8c8] focus-visible:ring-0 w-[260px] h-11 px-4" defaultValue="" />
                                <Button variant="ghost" size="icon" className="h-11 w-11 bg-[#d10053] rounded-r-[20px] hover:bg-[#b8004a] flex items-center justify-center">
                                    <SearchIcon className="w-6 h-6 text-[#e0b8c8]" />
                                </Button>
                            </div>
                            <Button className="h-11 w-11 bg-[#d10053] rounded-[27px] hover:bg-[#b8004a] flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6 text-white" />
                            </Button>
                            <Button className="h-11 px-4 bg-[#d10053] rounded-[27px] hover:bg-[#b8004a] flex items-center gap-2">
                                <PlusIcon className="w-[20px] h-[20px] text-white" />
                                <span className="text-white text-lg font-normal">Ajouter</span>
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
            {/* Filter Thematique */}
            <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] w-full">
                <div className="flex items-start gap-[10px] w-full grow overflow-y-scroll translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
                    <div className="flex flex-wrap min-w-[350px] items-start justify-center gap-5 flex-1 grow">
                        <Card className="flex flex-col max-w-[300px] items-center gap-4 pt-2.5 pb-0 px-0 flex-1 grow border-none shadow-none">
                            <CardContent className="p-0 w-full">
                                <div className="flex items-center justify-between w-full mb-4">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handlePrevMonth}>
                                        <ChevronLeftIcon className="h-6 w-6" />
                                    </Button>
                                    <div className="[font-family:'Poppins',Helvetica] text-xl font-normal text-black">
                                        {selectedMonth} {selectedYear}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleNextMonth}>
                                        <ChevronRightIcon className="h-6 w-6" />
                                    </Button>
                                </div>
                                <div className="flex flex-col w-full">
                                    {months.map((month, index) => (
                                        <Button
                                            key={month.name}
                                            variant="ghost"
                                            className={`h-[45.08px] justify-center p-2.5 w-full border-b border-[#efefef] rounded-none ${
                                                month.isSelected
                                                    ? "bg-[#d10053] text-white hover:bg-[#d10053] hover:text-white"
                                                    : "bg-white text-black hover:bg-gray-50"
                                            } translate-y-[-1rem] animate-fade-in opacity-0`}
                                            style={{ "--animation-delay": `${(index + 1) * 100}ms` } as React.CSSProperties}
                                            onClick={() => setSelectedMonth(month.name)}
                                        >
                                            <div className="[font-family:'Inter',Helvetica] font-normal text-base">{month.name}</div>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col min-w-[350px] flex-1 grow border-none shadow-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
                            <CardContent className="p-0">
                                <div className="flex h-[54px] items-center justify-between w-full rounded-[20px_20px_0px_0px]">
                                    {weekDays.map((day, index) => (
                                        <div
                                            key={day}
                                            className={`flex items-center justify-center gap-2.5 flex-1 h-full bg-[#f7f9ff] border-t border-l border-[#efefef] ${
                                                index === 0 ? "rounded-[20px_0px_0px_0px]" : ""
                                            } ${index === weekDays.length - 1 ? "rounded-[0px_20px_0px_0px] border-r" : ""}`}
                                        >
                                            <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-[17px] text-center">{day}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 h-[543px]">
                                    {calendarDays.map((dayData, index) => {
                                        const isFirstColumn = index % 7 === 0;
                                        const isLastColumn = index % 7 === 6;
                                        const isLastRow = Math.floor(index / 7) === 5; // 6 rows for a 42-day grid
                                        const hasEvents = dayData.events.length > 0;
                                        const isWeekday = !dayData.isWeekend && index % 7 !== 0 && index % 7 !== 6 && !dayData.isOtherMonth;
                                        return (
                                            <div
                                                key={`${dayData.day}-${index}`}
                                                className={`relative flex flex-col items-end gap-[5px] p-2.5 border-b border-l border-[#efefef] ${
                                                    dayData.isOtherMonth
                                                        ? "bg-gray-100 opacity-50"
                                                        : dayData.isWeekend
                                                            ? "bg-[#f7f9ff]"
                                                            : hasEvents
                                                                ? "bg-[#ffeaf2]"
                                                                : "bg-white"
                                                } ${isLastColumn ? "border-r" : ""} ${
                                                    isFirstColumn && isLastRow ? "rounded-[0px_0px_0px_20px]" : ""
                                                } ${isLastColumn && isLastRow ? "rounded-[0px_0px_20px_0px]" : ""} ${
                                                    isWeekday ? "group hover:bg-gray-100" : ""
                                                }`}
                                                onMouseEnter={() => isWeekday && setHoveredCell(index)}
                                                onMouseLeave={() => isWeekday && setHoveredCell(null)}
                                            >
                                                <div className="[font-family:'Inter',Helvetica] font-normal text-black text-sm text-center w-[18px]">
                                                    {dayData.day}
                                                </div>
                                                {dayData.events.length > 0 && (
                                                    <div className="inline-flex max-w-[50px] items-start gap-2.5">
                                                        {dayData.events.map((color, eventIndex) => (
                                                            <div
                                                                key={eventIndex}
                                                                className="w-[13px] h-[13px] rounded-[6.5px]"
                                                                style={{ backgroundColor: color }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                {isWeekday && hoveredCell === index && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-2 right-2 w-6 h-6 p-0 bg-[#d10053] hover:bg-[#b8004a] rounded-full"
                                                        onClick={openSessionModal}
                                                    >
                                                        <PlusIcon className="w-4 h-4 text-white" />
                                                    </Button>
                                                )}
                                                <div className="flex-1 w-full" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Card className="inline-flex flex-col max-w-[250px] items-start gap-5 pt-2.5 pb-5 px-5 border-none shadow-none translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                        <CardContent className="p-0">
                            <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-lg mb-5">Filtre des Thématiques</div>
                            <div className="inline-flex flex-col items-start justify-center gap-[13px]">
                                {themeFilters.map((filter, index) => (
                                    <Button
                                        key={filter.label}
                                        variant="ghost"
                                        className="gap-2.5 inline-flex items-center h-auto p-0 justify-start translate-y-[-1rem] animate-fade-in opacity-0"
                                        style={{ "--animation-delay": `${600 + index * 50}ms` } as React.CSSProperties}
                                    >
                                        <div className="w-[13px] h-[13px] rounded-[6.5px]" style={{ backgroundColor: filter.color }} />
                                        <div className="[font-family:'Poppins',Helvetica] font-normal text-black text-sm">{filter.label}</div>
                                    </Button>
                                ))}
                                <Button
                                    className="inline-flex items-center justify-center gap-2.5 px-5 py-[9px] bg-[#d10053] rounded-[21px] h-auto hover:bg-[#b8004a] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]"
                                    onClick={openThematicModal}
                                >
                                    <PlusIcon className="w-[13px] h-3.5 text-white" />
                                    <div className="[font-family:'Poppins',Helvetica] font-medium text-white text-base">Ajouter thématique</div>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* Thematic Modal */}
            {isThematicModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg">
                        <Frame />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-5 right-5 w-[29px] h-[29px] p-0 hover:bg-gray-100 transition-colors"
                            onClick={closeThematicModal}
                        >
                            <XIcon className="w-5 h-5" />
                        </Button>
                        <Button
                            className="absolute bottom-5 right-5 inline-flex items-center justify-center gap-2.5 px-5 py-[9px] bg-[#5e81ff] rounded-[21px] h-auto hover:bg-[#4c6eef] transition-colors"
                            onClick={closeThematicModal}
                        >
                            <CheckIcon className="relative w-[26px] h-[18.61px] ml-[-1.50px]" />
                            <span className="relative w-fit mt-[-1.00px] [font-family:'Poppins',Helvetica] font-medium text-white text-base tracking-[0] leading-[normal]">
                                Enregistre
                            </span>
                        </Button>
                    </div>
                </div>
            )}
            {isSessionModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-[95%] max-h-[95vh] overflow-y-auto">
                        <ModalSeance />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-5 right-5 w-[29px] h-[29px] p-0 hover:bg-gray-100 transition-colors"
                            onClick={closeSessionModal}
                        >
                            <XIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};