"use client";

import { useState } from "react";
import ContactCard from "@/components/ContactCard/ContactCard";
import ContactDetailsModal from "@/components/ContactDetailsModal/ContactDetailsModal";

type Contact = {
  id: string;
  name: string;
  occupation: string | null;
  organization: string | null;
  industry: string | null;
  email: string | null;
  phoneNumber: string | null;
  linkedinUrl: string | null;
  website: string | null;
  networkedBy: string | null;
  networkingContext: string | null;
  notes: string | null;
  photoUrl: string | null;
  createdAt: string;
};

type ContactsDirectoryProps = {
  contacts: Contact[];
};

export default function ContactsDirectory({
  contacts,
}: ContactsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  const industries = [
    "All",
    ...Array.from(
      new Set(
        contacts
          .map((contact) => contact.industry)
          .filter(
            (industry): industry is string =>
              Boolean(industry)
          )
      )
    ),
  ];

  const filteredContacts = contacts.filter((contact) => {
    const matchesName = contact.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All" ||
      contact.industry === selectedIndustry;

    return matchesName && matchesIndustry;
  });

  function openContact(contact: Contact) {
    setSelectedContact(contact);
  }

  function closeContact() {
    setSelectedContact(null);
  }

  return (
    <>
      {/* SEARCH + FILTER */}
      <div className="border-y border-white/10 py-6">
        <div className="flex flex-col gap-5 md:flex-row">
          {/* SEARCH */}
          <div className="flex-1">
            <label
              htmlFor="name-search"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
            >
              Search by name
            </label>

            <input
              id="name-search"
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for a person..."
              className="w-full border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition placeholder:text-neutral-700 hover:border-white/20 focus:border-[#D4AF37]"
            />
          </div>

          {/* INDUSTRY FILTER */}
          <div className="md:w-72">
            <label
              htmlFor="industry-filter"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500"
            >
              Industry
            </label>

            <select
              id="industry-filter"
              value={selectedIndustry}
              onChange={(event) =>
                setSelectedIndustry(event.target.value)
              }
              className="w-full border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#F5F1E8] outline-none transition hover:border-white/20 focus:border-[#D4AF37]"
            >
              {industries.map((industry) => (
                <option
                  key={industry}
                  value={industry}
                  className="bg-[#101010]"
                >
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div className="mt-10 flex items-end justify-between border-b border-white/10 pb-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Directory
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            People
          </h2>
        </div>

        <p className="font-mono text-xs text-neutral-500">
          {filteredContacts.length}{" "}
          {filteredContacts.length === 1
            ? "CONTACT"
            : "CONTACTS"}
        </p>
      </div>

      {/* CONTACT GRID */}
      {filteredContacts.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              role="button"
              tabIndex={0}
              onClick={() => openContact(contact)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  openContact(contact);
                }
              }}
              className="cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <ContactCard
                name={contact.name}
                occupation={contact.occupation ?? ""}
                organization={contact.organization ?? ""}
                industry={contact.industry ?? "Other"}
                networkedBy={contact.networkedBy ?? ""}
                photoUrl={contact.photoUrl ?? undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="border-b border-white/10 py-24 text-center">
          <p className="font-mono text-xs text-[#D4AF37]">
            0 RESULTS
          </p>

          <h3 className="mt-4 text-xl font-bold">
            No contacts found
          </h3>

          <p className="mt-2 text-sm text-neutral-600">
            Try changing your search or industry filter.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedIndustry("All");
            }}
            className="mt-6 text-xs font-bold uppercase tracking-widest text-[#D4AF37] transition hover:text-[#E5C14B]"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* CONTACT DETAILS MODAL */}
      <ContactDetailsModal
        contact={selectedContact}
        onClose={closeContact}
      />
    </>
  );
}