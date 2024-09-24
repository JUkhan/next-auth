
import React from 'react';
import { isMobile } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/headers";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog2";
import LegalConsultation from './DialogContent';

const DocumentManager = () => {
    const userAgent = headers().get("user-agent") || '';
    return (
        <>
            <div className="flex h-screen bg-white">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 p-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-8">Legido.</h1>
                    <nav className="space-y-4">
                        <a href="#" className="flex items-center text-blue-600 font-medium">
                            <span className="mr-2">📁</span> Moje dokumenty {isMobile(userAgent) ? '👇' : 'No'}
                        </a>
                        <a href="#" className="flex items-center text-gray-600">
                            <span className="mr-2">💳</span> Subskrypcja
                        </a>
                        <a href="#" className="flex items-center text-gray-600">
                            <span className="mr-2">⚙️</span> Ustawienia konta
                        </a>
                    </nav>
                    {/* ... Basic account section ... */}
                </aside>

                {/* Main content */}
                <main className="flex-1 p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold">Twoje dokumenty</h2>
                        <div className="flex items-center space-x-4">
                            <Input type="search" placeholder="Search..." className="w-64" />
                            <Button size="icon" variant="ghost">KK</Button>
                        </div>
                    </header>

                    <div className="flex justify-between items-center mb-6">
                        <Dialog>
                            <DialogTrigger>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    + Utwórz nowy dokument
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <LegalConsultation />
                            </DialogContent>
                        </Dialog>

                        <Button size="icon" variant="outline">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                        </Button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nazwa dokumentu</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data edycji</TableHead>
                                <TableHead>Akcje</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* Example row, repeat for each document */}
                            <TableRow>
                                <TableCell className="font-medium">
                                    <div className="flex items-center">
                                        <span className="mr-2">📄</span>
                                        Sprzeciw zarządu spółki z o.o. wobec zamiaru sprze...
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="default">Gotowy</Badge>
                                </TableCell>
                                <TableCell>29/09/2023</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button size="sm" variant="ghost">Pobierz WORD</Button>
                                        <Button size="sm" variant="ghost">Pobierz PDF</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {/* ... More rows ... */}
                        </TableBody>
                    </Table>

                </main>
            </div>

        </>
    );
};

export default DocumentManager;