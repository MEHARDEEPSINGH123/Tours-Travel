import os
import sys
import json
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """
    Two-pass canvas to dynamically compute and draw total page count
    along with running header and running footer on every page except the cover.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        if self._pageNumber > 1:
            self.saveState()
            # Running Header
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#123524"))
            self.drawString(54, 755, "VOYANTA LUXURY TRAVEL ATELIER")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#666666"))
            self.drawString(215, 755, "|   AI CHATBOT KNOWLEDGE BASE & SYSTEM RAG DOSSIER")
            
            # Gold rule under header
            self.setStrokeColor(colors.HexColor("#D4A373"))
            self.setLineWidth(0.75)
            self.line(54, 747, 558, 747)

            # Running Footer
            self.setStrokeColor(colors.HexColor("#EAE4DD"))
            self.setLineWidth(0.5)
            self.line(54, 45, 558, 45)

            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#777777"))
            self.drawString(54, 32, "CONFIDENTIAL & PROPRIETARY  •  STB LICENSED TA#03829  •  SINGAPORE FLAGSHIP ATELIER")
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#123524"))
            self.drawRightString(558, 32, f"Page {self._pageNumber} of {page_count}")
            self.restoreState()

def build_pdf():
    pdf_filename = "Voyanta_AI_Chatbot_Knowledge_Base.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    # Load raw dataset
    dataset_path = os.path.join("src", "data", "voyanta_travel_dataset.json")
    with open(dataset_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    # Styles
    base_styles = getSampleStyleSheet()

    c_primary = colors.HexColor("#123524")
    c_secondary = colors.HexColor("#3E5F44")
    c_luxury = colors.HexColor("#B8864E")
    c_dark = colors.HexColor("#1F2937")
    c_cream = colors.HexColor("#F8F6F2")
    c_border = colors.HexColor("#E5E0D8")

    title_style = ParagraphStyle(
        'CoverTitle',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=c_primary,
        alignment=0,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=13,
        leading=18,
        textColor=c_secondary,
        alignment=0,
        spaceAfter=25
    )

    h1_style = ParagraphStyle(
        'ChapterH1',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=c_primary,
        spaceBefore=18,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_secondary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'SectionH3',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=c_luxury,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=c_dark,
        spaceAfter=7
    )

    body_bold = ParagraphStyle(
        'CustomBodyBold',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13.5,
        textColor=c_primary
    )

    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_dark,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )

    callout_style = ParagraphStyle(
        'CalloutText',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_primary
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=c_primary
    )

    story = []

    def make_callout(text, bg_color=c_cream, border_color=c_luxury):
        p = Paragraph(f"<b>NOTE / DIRECTIVE:</b> {text}", callout_style)
        t = Table([[p]], colWidths=[504])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg_color),
            ('BOX', (0,0), (-1,-1), 1, border_color),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ]))
        return t

    # ==================== COVER PAGE ====================
    story.append(Spacer(1, 40))
    story.append(Paragraph("VOYANTA LUXURY TRAVEL ATELIER", ParagraphStyle(
        'CoverPre', fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=c_luxury, spaceAfter=8
    )))
    story.append(Paragraph("AI Chatbot Comprehensive Knowledge Base & System Context Dossier", title_style))
    story.append(Paragraph("The Definitive Operational Reference Manual, Entity Catalog, Concierge Guidelines, and RAG Ingestion Specification for Singapore Luxury Inbound & Outbound Journeys", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=c_luxury, spaceBefore=5, spaceAfter=20))

    meta_table_data = [
        [Paragraph("<b>Company Legal Name:</b>", body_style), Paragraph("Voyanta Pte. Ltd. (Voyanta Singapore Private Atelier)", body_style)],
        [Paragraph("<b>Singapore Headquarters:</b>", body_style), Paragraph("390 Orchard Road, Palais Renaissance, #12-01, Singapore 238871", body_style)],
        [Paragraph("<b>Regulatory Licensing:</b>", body_style), Paragraph("Singapore Tourism Board (STB) Licensed Travel Agent #03829", body_style)],
        [Paragraph("<b>Consumer Protection:</b>", body_style), Paragraph("Travel Agents Act (Cap. 334), CASETrust for Travel Accredited", body_style)],
        [Paragraph("<b>Base Accounting Currency:</b>", body_style), Paragraph("Singapore Dollar (SGD / S$) with real-time multi-currency support", body_style)],
        [Paragraph("<b>Document Version / Status:</b>", body_style), Paragraph("Version 2.5.0 Production Ingestion Build (Full Enriched Dataset)", body_style)],
        [Paragraph("<b>Target Chatbot Models:</b>", body_style), Paragraph("Anthropic Claude 3.5 / 3.7, OpenAI GPT-4o, Google Gemini 2.0 / 2.5", body_style)],
        [Paragraph("<b>Knowledge Base Scope:</b>", body_style), Paragraph("100 Packages, 50 Enclaves, 100 Itineraries, 50 Hotels, 25 Visa Frameworks, 100 Curations, Policies & Calendars", body_style)],
    ]
    t_meta = Table(meta_table_data, colWidths=[160, 344])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F9F9F8")),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 25))

    story.append(make_callout(
        "This document is an exhaustive system reference for AI conversational agents serving as Voyanta Senior Journey Concierges. "
        "Every pricing rule, enclave detail, itinerary structure, hotel perk, visa note, and policy herein represents authoritative atelier truth. "
        "The AI must adhere strictly to these facts, avoid hallucinations, and uphold Singapore's highest standards of luxury hospitality."
    ))

    story.append(PageBreak())

    # ==================== TABLE OF CONTENTS ====================
    story.append(Paragraph("TABLE OF CONTENTS", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=15))

    toc_items = [
        ("Chapter 1: AI Chatbot Persona, System Instructions & Behavioral Guardrails", "Page 3"),
        ("Chapter 2: Corporate Profile, Accreditation, Concierge Directory & Escalations", "Page 4"),
        ("Chapter 3: Currency Architecture, Taxation (9% GST + 10% Service Charge) & Foreign Rates", "Page 5"),
        ("Chapter 4: Singapore Destination Enclaves & Precinct Terroirs Guide (50 Zones)", "Page 6"),
        ("Chapter 5: Signature Tour Packages Catalog & Pricing Matrix (100 Curated Journeys)", "Page 8"),
        ("Chapter 6: Day-by-Day Handcrafted Itineraries & Dynamic Pace Customization", "Page 11"),
        ("Chapter 7: Luxury Hotels & Hospitality Sanctuaries Portfolio (50 Certified Properties)", "Page 13"),
        ("Chapter 8: Local Recommendations & Haute Gastronomy Guide (100 Insider Curations)", "Page 15"),
        ("Chapter 9: Exclusive VIP Add-Ons & Bespoke Upgrade Menu", "Page 17"),
        ("Chapter 10: Singapore Entry, SG Arrival Card (SGAC), Customs & Visa Information Centre", "Page 18"),
        ("Chapter 11: Booking Terms, Payment Safeguards & STB Escrow Compliance", "Page 20"),
        ("Chapter 12: Cancellation Policies, Weather Shields & Amendment Terms", "Page 21"),
        ("Chapter 13: 365-Day Seasonal Almanac, Climate & Annual Signature Events", "Page 22"),
        ("Chapter 14: Top 30 Frequently Asked Questions (FAQ) Matrix for Instant Retrieval", "Page 23"),
        ("Chapter 15: AI Chatbot Dialog Trees, Qualification Flow & Human Handover Schema", "Page 26"),
    ]
    toc_data = []
    for title, pg in toc_items:
        toc_data.append([Paragraph(title, body_bold), Paragraph(pg, ParagraphStyle('R', parent=body_style, alignment=2, textColor=c_luxury))])
    t_toc = Table(toc_data, colWidths=[420, 84])
    t_toc.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#EEEEEE")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 15))
    story.append(PageBreak())

    # ==================== CHAPTER 1 ====================
    story.append(Paragraph("Chapter 1: AI Chatbot Persona, System Instructions & Behavioral Guardrails", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1.1 System Identity & Conversational Persona", h2_style))
    story.append(Paragraph(
        "The chatbot acts as the <b>Voyanta Senior Journey Concierge</b>, a world-class, discreet, and deeply cultured Singapore travel specialist. "
        "The chatbot is authoritative yet gracious, warm, and highly knowledgeable about Singapore's architectural heritage, Michelin gastronomy, Southern Island marine terroirs, and luxury hospitality.",
        body_style
    ))
    story.append(Paragraph("<b>Core Tone Attributes:</b>", body_style))
    story.append(Paragraph("• <b>Editorial Elegance:</b> Speak with the voice of a luxury travel magazine editor (e.g. Conde Nast Traveler, Robb Report, Departures). Use refined, evocative descriptors without being verbose.", bullet_style))
    story.append(Paragraph("• <b>Warm Singapore Hospitality:</b> Express genuine pride in Singapore as a vibrant global crossroads, biophilic garden city, and culinary capital.", bullet_style))
    story.append(Paragraph("• <b>Discretion & Composure:</b> Never rush guests. Treat every client as an esteemed private voyager, ultra-high-net-worth individual (UHNW), or discerning family traveler.", bullet_style))
    story.append(Paragraph("• <b>Proactive Curation:</b> Don't just answer questions passively; anticipate needs by suggesting seamless transfers, ideal reservation timings, dietary considerations, and Changi tarmac VIP logistics.", bullet_style))

    story.append(Paragraph("1.2 Absolute Behavioral Guardrails & Operational Constraints", h2_style))
    story.append(Paragraph("The AI must strictly adhere to the following guardrails across all interactions:", body_style))
    guardrails = [
        "<b>No Hallucinated Pricing:</b> Quote exact prices in SGD (or converted equivalent) as specified in this Knowledge Base. If an experience is fully bespoke, state: <i>'Tailored on application by our Senior Journey Curators.'</i>",
        "<b>No Visa Guarantees:</b> Singapore entry permissions remain the sole legal prerogative of the Immigration & Checkpoints Authority (ICA). The bot must provide accurate requirements but always note: <i>'Entry into Singapore remains subject to ICA immigration clearance.'</i>",
        "<b>Strict Legal & Safety Advisory:</b> Warn travelers explicitly when asked regarding Singapore customs: chewing gum, e-cigarettes/vapes, and narcotics are strictly prohibited by law, with capital offenses strictly enforced.",
        "<b>Transparent Currency Clarity:</b> All package rates are anchored in Singapore Dollars (SGD / S$). When communicating with international clients, provide the converted amount with the clear disclaimer: <i>'Approximate conversion based on current reference rates; final settlement in SGD.'</i>",
        "<b>Seamless Handover to Human Curators:</b> For bookings requiring payment, bespoke contracts, private jet slots, or buyouts exceeding S$10,000, collect contact details and initiate a priority concierge handover."
    ]
    for g in guardrails:
        story.append(Paragraph(f"• {g}", bullet_style))

    story.append(Spacer(1, 10))

    # ==================== CHAPTER 2 ====================
    story.append(Paragraph("Chapter 2: Corporate Profile, Accreditation, Concierge Directory & Escalations", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("2.1 Corporate Identity & Legal Standing", h2_style))
    story.append(Paragraph(
        "<b>Voyanta (Voyanta Pte. Ltd.)</b> is a bespoke Singapore-based travel atelier licensed under the Singapore Tourism Board (Travel Agent License TA#03829) "
        "and regulated by the Travel Agents Act (Cap. 334). Voyanta maintains CASETrust for Travel accreditation and is a certified member of the National Association of Travel Agents Singapore (NATAS).",
        body_style
    ))
    story.append(Paragraph(
        "All client funds are safeguarded in statutory client trust escrow accounts. In the rare event of partner insolvency or catastrophic disruption, traveler investments are fully protected under Singapore law.",
        body_style
    ))

    story.append(Paragraph("2.2 Official Contact Directory & Concierge Desks", h2_style))
    contact_data = [
        [Paragraph("<b>Channel / Office</b>", table_header_style), Paragraph("<b>Direct Coordinate / Access</b>", table_header_style), Paragraph("<b>Operating Hours / SLA</b>", table_header_style)],
        [Paragraph("Flagship Private Atelier", table_cell_bold), Paragraph("390 Orchard Road, Palais Renaissance, #12-01, Singapore 238871", table_cell_style), Paragraph("Mon–Sat: 09:30 – 19:30 SGT (Private appointment preferred)", table_cell_style)],
        [Paragraph("24/7 Global Concierge Hotline", table_cell_bold), Paragraph("+65 6789 2389 / +65 9123 4567", table_cell_style), Paragraph("24 hours / 365 days (Immediate response)", table_cell_style)],
        [Paragraph("VIP Client WhatsApp Line", table_cell_bold), Paragraph("+65 9123 4567 (Dedicated encrypted channel)", table_cell_style), Paragraph("< 5 minutes response time", table_cell_style)],
        [Paragraph("General Inquiries & Bookings", table_cell_bold), Paragraph("concierge@voyanta.sg / voyages@voyanta.sg", table_cell_style), Paragraph("< 2 hours guaranteed turnaround", table_cell_style)],
        [Paragraph("Changi Airport Airside Operations", table_cell_bold), Paragraph("Changi Terminals 1, 2, 3 & 4 VIP JetQuay Lounges", table_cell_style), Paragraph("Coordinated per flight manifest", table_cell_style)],
    ]
    t_contact = Table(contact_data, colWidths=[140, 210, 154])
    t_contact.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_contact)
    story.append(Spacer(1, 15))

    # ==================== CHAPTER 3 ====================
    story.append(Paragraph("Chapter 3: Currency Architecture, Taxation & Foreign Exchange Reference", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("3.1 Currency System & All-Inclusive Pricing Standard", h2_style))
    story.append(Paragraph(
        "All Voyanta experiences, packages, stays, and bespoke upgrades are legally anchored in <b>Singapore Dollars (SGD / S$)</b>. "
        "Voyanta operates on a strict <b>All-Inclusive Transparency Standard</b>: every published rate includes the mandatory 9% Singapore Goods and Services Tax (GST) "
        "and standard 10% hospitality service charge. Travelers never encounter hidden resort fees, credit card transaction surcharges, or unexpected administrative add-ons.",
        body_style
    ))

    story.append(Paragraph("3.2 Multi-Currency Reference Rates", h2_style))
    story.append(Paragraph("For international travelers, the AI Chatbot utilizes the following standardized currency conversion reference table:", body_style))

    cur_data = [
        [Paragraph("<b>Currency Code</b>", table_header_style), Paragraph("<b>Symbol</b>", table_header_style), Paragraph("<b>Reference Rate (per 1 SGD)</b>", table_header_style), Paragraph("<b>Sample S$1,000 Equivalent</b>", table_header_style)],
        [Paragraph("SGD (Base)", table_cell_bold), Paragraph("S$", table_cell_style), Paragraph("1.0000", table_cell_style), Paragraph("S$1,000.00", table_cell_style)],
        [Paragraph("USD (US Dollar)", table_cell_bold), Paragraph("$", table_cell_style), Paragraph("0.7400", table_cell_style), Paragraph("$740.00", table_cell_style)],
        [Paragraph("EUR (Euro)", table_cell_bold), Paragraph("€", table_cell_style), Paragraph("0.6900", table_cell_style), Paragraph("€690.00", table_cell_style)],
        [Paragraph("GBP (British Pound)", table_cell_bold), Paragraph("£", table_cell_style), Paragraph("0.5900", table_cell_style), Paragraph("£590.00", table_cell_style)],
        [Paragraph("AUD (Australian Dollar)", table_cell_bold), Paragraph("A$", table_cell_style), Paragraph("1.1400", table_cell_style), Paragraph("A$1,140.00", table_cell_style)],
        [Paragraph("JPY (Japanese Yen)", table_cell_bold), Paragraph("¥", table_cell_style), Paragraph("114.50", table_cell_style), Paragraph("¥114,500", table_cell_style)],
    ]
    t_cur = Table(cur_data, colWidths=[100, 60, 174, 170])
    t_cur.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_secondary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_cur)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==================== CHAPTER 4 ====================
    story.append(Paragraph("Chapter 4: Singapore Destination Enclaves & Precinct Terroirs Guide (50 Zones)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph(
        "Voyanta categorizes Singapore into 5 distinct geographic and cultural enclaves, encompassing 50 certified micro-precincts. "
        "The AI Chatbot should guide clients to destinations aligned with their personal travel tastes:",
        body_style
    ))

    enclaves = [
        ("1. Marina Bay & Civic District", "Futuristic Architecture, Waterfront Skyline & British Colonial Heritage",
         "Encompasses Marina Bay Sands SkyPark, Gardens by the Bay, National Gallery Singapore, Fullerton Pier, and the historic Padang. "
         "Ideal for first-time luxury travelers, architecture lovers, and high-altitude dining. Transit from Changi: 20 minutes via private limousine. "
         "Top Stays: The Fullerton Bay Hotel, Marina Bay Sands Paiza Suites, The Ritz-Carlton Millenia."),

        ("2. Sentosa Island & Southern Maritime Archipelago", "Clifftop Rainforest Sanctuaries & Secluded Island Lagoons",
         "Spans Capella Sentosa, Tanjong Beach, Lazarus Island, St. John's Island, and Sentosa Cove yacht marina. "
         "Features pristine white-sand crescent beaches, private catamaran anchorages, and coastal tranquility. Transit from Changi: 25 minutes. "
         "Top Stays: Capella Singapore, The Barracks Hotel Sentosa, W Singapore Sentosa Cove."),

        ("3. Heritage Conservation Quarters", "Peranakan Grandeur, Sacred Ateliers & Shophouse Dining",
         "Includes Katong & Joo Chiat (pastel Peranakan shophouses, beaded slipper ateliers), Kampong Gelam & Arab Street (Sultan Mosque, artisanal perfumeries), "
         "and Chinatown & Telok Ayer (Thian Hock Keng temple, Michelin-starred bistros). Transit from Changi: 15–20 minutes. "
         "Top Highlights: Private Peranakan heirloom tea ceremonies, Sifr Aromatics perfume bespoke compounding."),

        ("4. Dempsey Hill, Tanglin & UNESCO Botanic Gardens", "Old Colonial Barracks, Lush Valley Dining & VIP Orchid Pavilions",
         "Located adjacent to the 160-year-old Singapore Botanic Gardens (UNESCO World Heritage Site). Features colonial British army barracks converted into "
         "haute gastronomy temples (Candlenut, Burnt Ends, Culina) and antique emporiums. Transit from Changi: 25 minutes. "
         "Top Highlights: Private VIP viewing of National Orchid Garden with cultivars named after heads of state."),

        ("5. Mandai Rainforest & Northern Wilderness Estuaries", "Pristine Rainforest, World-Class Conservation & Rustic Coastal Islets",
         "Home to the Mandai Wildlife Reserve (Night Safari, River Wonders, Singapore Zoo, Bird Paradise) and rustic Pulau Ubin / Chek Jawa Wetlands. "
         "Ideal for eco-luxury, families, and nocturnal zoological safaris. Transit from Changi: 30 minutes. "
         "Top Highlights: VIP Night Safari electric buggy accompanied by senior zoologist with front-row elephant feedings.")
    ]

    for title, subtitle, desc in enclaves:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(f"<i>{subtitle}</i>", h3_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 4))

    story.append(Paragraph("4.2 Comprehensive Inventory of All 50 Singapore Enclave Entities", h2_style))
    story.append(Paragraph("The dataset encodes 50 specific destination zones (DST001 to DST050). The AI Chatbot should reference these exact precinct codes during client qualification:", body_style))

    # Grid of destination IDs
    dest_samples = [
        ("DST001", "Marina Bay Waterfront Promenade"), ("DST002", "Civic District & Colonial Padang"),
        ("DST003", "Sentosa Island Clifftop Coastline"), ("DST004", "Lazarus Island & Secluded Lagoon"),
        ("DST005", "Katong & Joo Chiat Heritage Enclave"), ("DST006", "Kampong Gelam & Arab Street Atelier"),
        ("DST007", "Chinatown & Telok Ayer Dining Quarter"), ("DST008", "Dempsey Hill Colonial Barracks"),
        ("DST009", "Singapore Botanic Gardens (UNESCO)"), ("DST010", "Mandai Rainforest Reserve & Night Safari"),
        ("DST011", "Pulau Ubin Rustic Kampong Coastal Estuary"), ("DST012", "Tanjong Pagar & Duxton Shophouses"),
        ("DST013", "Orchard Road & Emerald Hill Heritage Lane"), ("DST014", "Fullerton Heritage Pier & Singapore River"),
        ("DST015", "Southern Islands Marine Conservation Area")
    ]
    dest_table_data = [[Paragraph("<b>ID</b>", table_header_style), Paragraph("<b>Destination Name</b>", table_header_style), Paragraph("<b>Core Terroir Attribute</b>", table_header_style)]]
    for did, dname in dest_samples:
        dest_table_data.append([
            Paragraph(did, table_cell_bold),
            Paragraph(dname, table_cell_style),
            Paragraph("Singapore Flagship Territory • Changi VIP Access", table_cell_style)
        ])
    t_dest = Table(dest_table_data, colWidths=[60, 240, 204])
    t_dest.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_dest)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==================== CHAPTER 5 ====================
    story.append(Paragraph("Chapter 5: Signature Tour Packages Catalog & Pricing Matrix (100 Curated Journeys)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("5.1 Package Architecture & Travel Styles", h2_style))
    story.append(Paragraph(
        "Voyanta maintains 100 distinctive journey packages (PKG001 to PKG100) organized across 8 primary travel disciplines. "
        "Every package includes private luxury airport and in-city transfers, dedicated journey concierges, curated 5-star estate accommodations, and private access privileges.",
        body_style
    ))

    pkg_disciplines = [
        ("Luxury & Presidential Heritage", "S$2,800 – S$4,200", "Colonial Palm Court suites, Changi tarmac Rolls-Royce meet, private National Gallery curator tours."),
        ("Island Escapes & Maritime Charters", "S$2,200 – S$3,600", "Private 50ft luxury catamaran to Lazarus Island, beach club cabanas, twilight yacht dining."),
        ("Haute Gastronomy & Michelin Dining", "S$2,400 – S$3,800", "Three-Star Michelin Odette chef table buyouts, heirloom Peranakan feasts, private Lau Pa Sat satay banquets."),
        ("Biophilic Nature & Rainforest Sanctuaries", "S$1,600 – S$2,900", "After-hours Cloud Forest geyser mist, UNESCO Botanic Gardens orchid pavilions, tree-top walks."),
        ("Cultural Immersion & Living Peranakan Heritage", "S$1,500 – S$2,600", "Private audiences with Nyonya tile artisans, shophouse attic museums, custom batik masterclasses."),
        ("Restorative Wellness & Lunar Healing", "S$1,800 – S$3,100", "Capella Auriga moon-phase body treatments, sound bath ceremonies, vitality thermal mineral pools."),
        ("Family Marvel & Private Zoological Safari", "S$1,900 – S$3,200", "Behind-the-scenes Mandai wildlife encounters, private Night Safari electric buggy, Universal Studios VIP."),
        ("Eco-Adventure & Rustic Offshore Islets", "S$1,200 – S$2,100", "Pulau Ubin mangrove sea-kayaking, Chek Jawa intertidal reef discovery, coastal cycling expeditions.")
    ]
    pkg_disc_data = [[Paragraph("<b>Discipline</b>", table_header_style), Paragraph("<b>SGD Price Range</b>", table_header_style), Paragraph("<b>Signature Curated Inclusions</b>", table_header_style)]]
    for d, pr, inc in pkg_disciplines:
        pkg_disc_data.append([Paragraph(d, table_cell_bold), Paragraph(pr, table_cell_style), Paragraph(inc, table_cell_style)])
    t_pdisc = Table(pkg_disc_data, colWidths=[130, 90, 284])
    t_pdisc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_secondary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_pdisc)
    story.append(Spacer(1, 10))

    story.append(Paragraph("5.2 Selected High-Intent Signature Packages (Primary Chatbot Recommendations)", h2_style))
    featured_pkgs = [
        ("PKG001", "Singapore Presidential Grandeur & Raffles Heritage", "Luxury", "5 Days / 4 Nights", "S$2,850", "Capella Sentosa & Raffles Palm Court; Changi tarmac limousine, 3-Star Odette chef table, private bumboat."),
        ("PKG002", "Southern Islands Catamaran & Lazarus Bay Retreat", "Island Escapes", "4 Days / 3 Nights", "S$2,450", "Private 50ft sailing catamaran charter, Lazarus secluded lagoon anchorage, private chef beachside barbecue."),
        ("PKG003", "Michelin Haute Gastronomy & Peranakan Royalty", "Food & Wine", "4 Days / 3 Nights", "S$2,680", "Odette 3-star buyout, Candlenut private feast, historic Lau Pa Sat satay street private reserved lounge."),
        ("PKG004", "Biophilic Wonders & UNESCO Rainforest Immersion", "Nature", "3 Days / 2 Nights", "S$1,780", "VIP Cloud Forest access before general public, Singapore Botanic Gardens orchid pavilion, Night Safari buggy."),
        ("PKG005", "Straits Peranakan Living Culture & Shophouse Secrets", "Cultural", "4 Days / 3 Nights", "S$1,950", "Katong antique attic tea tasting, Straits porcelain masterclass, artisanal perfume compounding on Arab Street."),
        ("PKG006", "Capella Auriga Moon-Phase Wellness Sanctuary", "Wellness", "5 Days / 4 Nights", "S$2,980", "Capella premier seaview suite, Auriga 120-min lunar massage, organic macrobiotic dining, mineral thermal pools."),
        ("PKG007", "Mandai Zoological VIP Safari & Family Expedition", "Family", "4 Days / 3 Nights", "S$2,320", "Private Night Safari and Bird Paradise electric buggy, VIP animal feedings, Universal Studios VIP escort."),
        ("PKG008", "Pulau Ubin Sea-Kayaking & Mangrove Wilderness", "Adventure", "3 Days / 2 Nights", "S$1,420", "Guided sea-kayaking through Sungei Jelutong mangroves, Chek Jawa coastal boardwalk, rustic seafood dinner.")
    ]
    feat_data = [
        [Paragraph("<b>Code</b>", table_header_style), Paragraph("<b>Package Name</b>", table_header_style), Paragraph("<b>Style</b>", table_header_style), Paragraph("<b>Duration</b>", table_header_style), Paragraph("<b>SGD Price</b>", table_header_style), Paragraph("<b>Executive Highlights</b>", table_header_style)]
    ]
    for pid, pname, pstyle, pdur, ppr, phl in featured_pkgs:
        feat_data.append([
            Paragraph(pid, table_cell_bold),
            Paragraph(pname, table_cell_bold),
            Paragraph(pstyle, table_cell_style),
            Paragraph(pdur, table_cell_style),
            Paragraph(ppr, table_cell_bold),
            Paragraph(phl, table_cell_style)
        ])
    t_feat = Table(feat_data, colWidths=[45, 125, 65, 70, 55, 144])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_feat)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==================== CHAPTER 6 ====================
    story.append(Paragraph("Chapter 6: Day-by-Day Handcrafted Itineraries & Dynamic Pace Customization", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("6.1 Itinerary Architecture & Daily Sequencing", h2_style))
    story.append(Paragraph(
        "Voyanta itineraries are meticulously choreographed to optimize climatic comfort in Singapore's tropical environment. "
        "Outdoor heritage walks and island activities are scheduled for cooler morning hours (08:30–11:00) and twilight/sunset periods (17:30–21:00), "
        "with midday heat reserved for climate-controlled Michelin dining, art galleries, high tea, or wellness spa treatments.",
        body_style
    ))

    story.append(Paragraph("<b>Standard Daily Sequencing:</b>", body_style))
    story.append(Paragraph("• <b>Morning Phase (08:30 – 11:30):</b> Chauffeur arrival, private garden strolls, architectural photography, or island boat transfers before peak heat.", bullet_style))
    story.append(Paragraph("• <b>Midday Pause (12:00 – 15:30):</b> Multi-course gourmet lunch, luxury shopping in air-conditioned suites, or private gallery viewings.", bullet_style))
    story.append(Paragraph("• <b>Afternoon High Tea & Sanctuary Time (15:30 – 17:30):</b> Raffles Palm Court tiffin tea, Capella library relaxation, or estate pool rest.", bullet_style))
    story.append(Paragraph("• <b>Twilight & Evening Grandeur (18:00 – 22:30):</b> Sunset catamaran sail, 3-Star Michelin dinner, rooftop skyline cocktails, or VIP Night Safari buggy.", bullet_style))

    story.append(Paragraph("6.2 Dynamic Pace Customization Matrix", h2_style))
    story.append(Paragraph("The AI Chatbot allows users to calibrate any itinerary to three distinct travel paces:", body_style))

    pace_data = [
        [Paragraph("<b>Pace Option</b>", table_header_style), Paragraph("<b>Daily Start Time</b>", table_header_style), Paragraph("<b>Activity Load</b>", table_header_style), Paragraph("<b>Target Traveler Persona</b>", table_header_style)],
        [Paragraph("Leisurely", table_cell_bold), Paragraph("10:30 AM", table_cell_style), Paragraph("1 major curation + extended lunch + spa", table_cell_style), Paragraph("Couples, retirees, honeymooners, relaxation seekers", table_cell_style)],
        [Paragraph("Immersive (Default)", table_cell_bold), Paragraph("09:00 AM", table_cell_style), Paragraph("2 major curations + signature dinner", table_cell_style), Paragraph("First-time Singapore visitors, cultural enthusiasts", table_cell_style)],
        [Paragraph("VIP Fast-Paced", table_cell_bold), Paragraph("08:00 AM", table_cell_style), Paragraph("3–4 curations + private speedboat/helicopter", table_cell_style), Paragraph("Executive stopovers, photography collectors, high-energy guests", table_cell_style)]
    ]
    t_pace = Table(pace_data, colWidths=[90, 80, 164, 170])
    t_pace.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_secondary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_pace)
    story.append(Spacer(1, 10))

    story.append(Paragraph("6.3 Sample Day-by-Day Walkthrough (Signature Itinerary: ITI001)", h2_style))
    sample_days = [
        ("Day 1: Royal Arrival & Marina Bay Twilight", "Private Changi airside meet; Maybach transfer to Raffles Hotel Palm Court Suite; evening champagne bumboat on Singapore River; welcome dinner at National Kitchen by Violet Oon."),
        ("Day 2: Living Heritage & Michelin Gastronomy", "Morning private shophouse walking tour of Katong & Joo Chiat; Peranakan beadwork masterclass; 3-course lunch at Candlenut; late afternoon rest; 7-course dinner at 3-Star Michelin Odette."),
        ("Day 3: Southern Islands Private Catamaran Voyage", "Morning embarkation at Sentosa Cove on 50ft catamaran; cruise to Lazarus Island lagoon for secluded swimming and paddleboarding; private onboard chef seafood barbecue; sunset cruise past Marina Bay skyline."),
        ("Day 4: Biophilic Marvels & Grand Finale", "Dawn stroll through Cloud Forest mist canopy before public opening; private orchid viewing with head botanist; Capella Auriga lunar spa treatment; farewell rooftop cocktails at CÉ LA VI SkyBar.")
    ]
    for dtitle, ddesc in sample_days:
        story.append(Paragraph(f"<b>{dtitle}</b>", h3_style))
        story.append(Paragraph(ddesc, body_style))

    story.append(PageBreak())

    # ==================== CHAPTER 7 ====================
    story.append(Paragraph("Chapter 7: Luxury Hotels & Hospitality Sanctuaries Portfolio (50 Certified Properties)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("7.1 Estate Criteria & Guaranteed Voyanta VIP Privileges", h2_style))
    story.append(Paragraph(
        "Every hotel in the Voyanta 50-property certified portfolio (HOT001 to HOT050) has undergone rigorous independent inspection. "
        "When booked through Voyanta, guests receive the following guaranteed complimentary privileges without surcharge:",
        body_style
    ))
    hotel_perks = [
        "<b>Guaranteed Room/Suite Upgrade:</b> One category upgrade granted upon booking or check-in subject to availability.",
        "<b>Daily Gourmet Breakfast for Two:</b> Full artisanal breakfast served in signature restaurants or suite dining.",
        "<b>S$150 Estate Credit:</b> Applicable to signature hotel restaurants, bars, and luxury spa treatments per stay.",
        "<b>Flexible Check-In / Check-Out:</b> Early priority check-in from 11:00 AM and guaranteed late check-out until 16:00 (4:00 PM).",
        "<b>Personal Butler Orientation & Welcome Amenity:</b> Handcrafted Singapore confectionery, vintage champagne on arrival."
    ]
    for p in hotel_perks:
        story.append(Paragraph(f"• {p}", bullet_style))

    story.append(Paragraph("7.2 Primary Partner Estates & Architectural Highlights", h2_style))

    hotel_table_data = [
        [Paragraph("<b>Hotel Name</b>", table_header_style), Paragraph("<b>Enclave / Location</b>", table_header_style), Paragraph("<b>Starting Rate / Night</b>", table_header_style), Paragraph("<b>Distinctive Distinction & Signature Suite</b>", table_header_style)],
        [Paragraph("Raffles Hotel Singapore", table_cell_bold), Paragraph("Civic District & Bras Basah", table_cell_style), Paragraph("S$1,350", table_cell_bold), Paragraph("Iconic 1887 British colonial landmark; Palm Court & Presidential Suites with personal butlers.", table_cell_style)],
        [Paragraph("Capella Singapore", table_cell_bold), Paragraph("Sentosa Island Clifftop", table_cell_style), Paragraph("S$1,250", table_cell_bold), Paragraph("Norman Foster curved modernism nestled in 30 acres of rainforest; clifftop private pool villas.", table_cell_style)],
        [Paragraph("The Fullerton Bay Hotel", table_cell_bold), Paragraph("Marina Bay Waterfront", table_cell_style), Paragraph("S$980", table_cell_bold), Paragraph("Overwater bayfront luxury with panoramic views of Marina Bay Sands; Lantern rooftop bar.", table_cell_style)],
        [Paragraph("The Ritz-Carlton, Millenia", table_cell_bold), Paragraph("Marina Centre", table_cell_style), Paragraph("S$890", table_cell_bold), Paragraph("Legendary octagonal bathroom windows with harbor views; museum-grade 4,200-piece art collection.", table_cell_style)],
        [Paragraph("Marina Bay Sands (Paiza Tier)", table_cell_bold), Paragraph("Marina Bay Promenade", table_cell_style), Paragraph("S$1,450", table_cell_bold), Paragraph("Ultra-exclusive Paiza suites with private gaming, high-altitude infinity pool, VIP check-in lounge.", table_cell_style)],
        [Paragraph("The Barracks Hotel Sentosa", table_cell_bold), Paragraph("Sentosa Island Heritage", table_cell_style), Paragraph("S$820", table_cell_bold), Paragraph("Meticulously restored colonial artillery outpost with 40 bespoke heritage suites and pool access.", table_cell_style)],
        [Paragraph("Artyzen Singapore", table_cell_bold), Paragraph("Orchard / Cuscaden", table_cell_style), Paragraph("S$650", table_cell_bold), Paragraph("Biophilic architectural triumph with soaring sky gardens, cantilevered rooftop pool.", table_cell_style)],
        [Paragraph("The Clan Hotel", table_cell_bold), Paragraph("Telok Ayer / CBD", table_cell_style), Paragraph("S$580", table_cell_bold), Paragraph("Modern Asian luxury paying homage to traditional clan associations; Master Series tea master service.", table_cell_style)]
    ]
    t_hotels = Table(hotel_table_data, colWidths=[120, 110, 74, 200])
    t_hotels.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_hotels)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==================== CHAPTER 8 ====================
    story.append(Paragraph("Chapter 8: Local Recommendations & Haute Gastronomy Guide (100 Insider Curations)", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("8.1 Culinary Excellence & Michelin Curation", h2_style))
    story.append(Paragraph(
        "Singapore represents one of the world's most concentrated culinary territories. Voyanta's concierge desk holds direct reservations "
        "and chef counter relationships across Singapore's leading gastronomic establishments:",
        body_style
    ))

    dining_curations = [
        ("Odette (3-Star Michelin)", "National Gallery Singapore", "French Haute Cuisine", "Helmed by Chef Julien Royer; delicate French cooking celebrating Asian seasonality. Voyanta secures exclusive window banquettes overlooking the historical gallery rotunda."),
        ("Les Amis (3-Star Michelin)", "Shaw Centre, Orchard", "Classic French Haute Gastronomy", "Grand French dining with an encyclopedic 3,000-label wine cellar. Formal dress code strictly observed; private salon reservations guaranteed."),
        ("Zén (3-Star Michelin)", "Bukit Pasoh Road", "Nordic-Japanese Kaiseki", "Sister restaurant to Stockholm's Frantzén. Immersive multi-story dining experience through a 1920s heritage shophouse."),
        ("Candlenut (1-Star Michelin)", "Dempsey Hill", "Refined Straits Peranakan", "The world's first and only Michelin-starred Peranakan restaurant by Chef Malcolm Lee. Signature: Buah Keluak beef short ribs and blue pea rice."),
        ("Burnt Ends (1-Star Michelin)", "Dempsey Hill", "Modern Australian Wood-Fired", "Custom dual-cavity apple and almond wood ovens; counter dining with Chef Dave Pynt. One of the toughest reservations in Asia; secured via Voyanta."),
        ("Lau Pa Sat Satay Street", "Downtown Financial District", "Hawker Charcoal Grill Culture", "Boon Tat Street closes nightly at 7 PM for open-air charcoal satay carts. Voyanta provides reserved seated lounge service at Stalls 7 & 8.")
    ]
    dining_data = [
        [Paragraph("<b>Establishment</b>", table_header_style), Paragraph("<b>Location</b>", table_header_style), Paragraph("<b>Cuisine Style</b>", table_header_style), Paragraph("<b>Concierge Curation & Access Privilege</b>", table_header_style)]
    ]
    for dname, dloc, dcuis, dnote in dining_curations:
        dining_data.append([
            Paragraph(dname, table_cell_bold),
            Paragraph(dloc, table_cell_style),
            Paragraph(dcuis, table_cell_style),
            Paragraph(dnote, table_cell_style)
        ])
    t_dining = Table(dining_data, colWidths=[120, 100, 100, 184])
    t_dining.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_secondary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_dining)
    story.append(Spacer(1, 10))

    story.append(Paragraph("8.2 Secret Cultural & Experiential Gems", h2_style))
    recs = [
        ("Attic Tea Ceremony at 1880s Shophouse (Katong):", "Climb steep wooden staircases into a collector's private museum to taste rare vintage puerh from ancient Straits porcelain with tea master Tan."),
        ("Artisanal Perfume Creation at Sifr Aromatics (Kampong Gelam):", "Bespoke perfume compounding using pure oud, damask rose, and ambergris in an intimate 19th-century Arab Street atelier."),
        ("Dawn Mist Stroll at Cloud Forest (Gardens by the Bay):", "Exclusive early 09:00 AM entrance as the 35-meter indoor waterfall mist geyser activates before public admission crowds arrive."),
        ("VIP Orchid Pavilion Viewing (Botanic Gardens):", "Private botanical guide access to climate-controlled VIP pavilions housing rare hybrid orchids named after Queen Elizabeth II, Nelson Mandela, and royalty.")
    ]
    for rtitle, rdesc in recs:
        story.append(Paragraph(f"• <b>{rtitle}</b> {rdesc}", bullet_style))

    story.append(Spacer(1, 10))

    # ==================== CHAPTER 9 ====================
    story.append(Paragraph("Chapter 9: Exclusive VIP Add-Ons & Bespoke Upgrade Menu", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("Clients may customize any Voyanta itinerary with the following standalone ultra-luxury upgrades:", body_style))

    addons = [
        ("Changi Tarmac VIP Limousine Meet", "S$350 / arrival", "Changi JetQuay VIP escort directly from aircraft air-bridge, expedited private diplomatic customs clearance, Mercedes-Maybach transfer to hotel."),
        ("3-Star Michelin Odette Private Chef Counter Buyout", "S$680 / guest", "Exclusive counter buyout with Chef Julien Royer, custom 8-course prestige menu, sommelier grand cru wine pairing."),
        ("Southern Islands 50ft Luxury Catamaran Sunset Cruise", "S$1,200 / charter", "4-hour private charter to Lazarus & St. John's Island lagoon, private butler service, chilled vintage champagne, sunset skyline cruise."),
        ("Capella Auriga Full Moon Lunar Herbal Spa Ritual", "S$380 / guest", "120-minute restorative treatment aligned to lunar moon cycles, organic botanical essential oils, sound bath therapy, vitality pool access."),
        ("Gardens by the Bay After-Hours Cloud Forest Access", "S$850 / group", "Private opening of Cloud Forest and Flower Dome after public closure, architectural lighting tailored for private photography."),
        ("Singapore Flyer Private Sunrise Champagne Capsule", "S$550 / flight", "Private 30-minute revolving flight at 165 meters above Marina Bay, butler-served champagne, artisanal morning pastries.")
    ]
    addon_data = [
        [Paragraph("<b>VIP Add-on Service</b>", table_header_style), Paragraph("<b>Price (SGD)</b>", table_header_style), Paragraph("<b>Executive Service Specification</b>", table_header_style)]
    ]
    for aname, apr, adesc in addons:
        addon_data.append([
            Paragraph(aname, table_cell_bold),
            Paragraph(apr, table_cell_bold),
            Paragraph(adesc, table_cell_style)
        ])
    t_addon = Table(addon_data, colWidths=[150, 80, 274])
    t_addon.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_addon)
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # ==================== CHAPTER 10 ====================
    story.append(Paragraph("Chapter 10: Singapore Entry, SG Arrival Card (SGAC), Customs & Visa Information Centre", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("10.1 SG Arrival Card (SGAC) Mandatory Declaration", h2_style))
    story.append(Paragraph(
        "<b>All foreign travelers</b> entering Singapore must submit the electronic <b>SG Arrival Card (SGAC)</b> with Health Declaration within <b>3 days (72 hours)</b> "
        "prior to arrival in Singapore. Submission is 100% free of charge via the official Immigration & Checkpoints Authority (ICA) portal or MyICA Mobile app. "
        "Voyanta concierges pre-fill and verify SGAC submissions for all confirmed journey guests.",
        body_style
    ))

    story.append(Paragraph("10.2 Visa Framework by Nationality (25 Certified Jurisdictions)", h2_style))
    story.append(Paragraph(
        "Passport holders from approximately 80% of jurisdictions may enter Singapore visa-free for social visits up to 30 or 90 days. "
        "The following matrix summarizes the visa framework across key traveler markets:",
        body_style
    ))

    visa_data = [
        [Paragraph("<b>Region / Country</b>", table_header_style), Paragraph("<b>Visa Status</b>", table_header_style), Paragraph("<b>Allowed Stay</b>", table_header_style), Paragraph("<b>Processing & Requirements</b>", table_header_style)],
        [Paragraph("United States / Canada", table_cell_bold), Paragraph("Visa-Free", table_cell_style), Paragraph("90 Days", table_cell_style), Paragraph("Passport with 6 months validity + SGAC", table_cell_style)],
        [Paragraph("European Union / UK", table_cell_bold), Paragraph("Visa-Free", table_cell_style), Paragraph("90 Days", table_cell_style), Paragraph("Passport with 6 months validity + SGAC", table_cell_style)],
        [Paragraph("Australia / New Zealand", table_cell_bold), Paragraph("Visa-Free", table_cell_style), Paragraph("90 Days", table_cell_style), Paragraph("Passport with 6 months validity + SGAC", table_cell_style)],
        [Paragraph("Japan / South Korea", table_cell_bold), Paragraph("Visa-Free", table_cell_style), Paragraph("90 Days", table_cell_style), Paragraph("Passport with 6 months validity + SGAC", table_cell_style)],
        [Paragraph("ASEAN Member States", table_cell_bold), Paragraph("Visa-Free", table_cell_style), Paragraph("30 Days", table_cell_style), Paragraph("Passport with 6 months validity + SGAC", table_cell_style)],
        [Paragraph("China (PRC)", table_cell_bold), Paragraph("Mutual Visa Exemption", table_cell_style), Paragraph("30 Days", table_cell_style), Paragraph("Mutual 30-day visa exemption effective Feb 2024", table_cell_style)],
        [Paragraph("India (Assessment Level I)", table_cell_bold), Paragraph("eVisa Required", table_cell_style), Paragraph("30 Days", table_cell_style), Paragraph("Processed in 1–3 business days via Voyanta authorized agent", table_cell_style)],
        [Paragraph("CIS / Ukraine / Central Asia", table_cell_bold), Paragraph("eVisa Required", table_cell_style), Paragraph("30 Days", table_cell_style), Paragraph("Assessment Level I; submitted via local Singapore sponsor", table_cell_style)],
        [Paragraph("Assessment Level II (e.g. ME)", table_cell_bold), Paragraph("Entry Visa Required", table_cell_style), Paragraph("Up to 30 Days", table_cell_style), Paragraph("Submission 2–4 weeks prior; letter of introduction required", table_cell_style)]
    ]
    t_visa = Table(visa_data, colWidths=[120, 95, 75, 214])
    t_visa.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_visa)
    story.append(Spacer(1, 10))

    story.append(Paragraph("10.3 Singapore Customs Allowances & Strict Prohibitions", h2_style))
    customs_rules = [
        "<b>Duty-Free Liquor Allowance:</b> Arriving passengers (excluding overland travelers from Malaysia) are entitled to 1 of 3 duty-free options: (A) 1L spirits, 1L wine; (B) 1L spirits, 1L beer; (C) 1L wine, 1L beer.",
        "<b>No Duty-Free Cigarette/Tobacco Concession:</b> There is ZERO duty-free allowance for cigarettes or tobacco products. All tobacco brought into Singapore must be declared at the Red Channel and is subject to full customs duty and GST.",
        "<b>Strictly Prohibited Goods (Automatic Confiscation & Penalties):</b> Chewing gum (except oral dental/medicinal gum with HSA approval), chewing tobacco, electronic vaporizers/e-cigarettes/e-liquids (illegal to import, purchase, or possess), pistol-shaped lighters, firecrackers.",
        "<b>Strict Anti-Narcotics Warning:</b> Singapore maintains zero tolerance for controlled drugs. Trafficking, import, or possession carries severe statutory penalties, including capital punishment."
    ]
    for cr in customs_rules:
        story.append(Paragraph(f"• {cr}", bullet_style))

    story.append(Spacer(1, 10))

    # ==================== CHAPTER 11 ====================
    story.append(Paragraph("Chapter 11: Booking Terms, Payment Safeguards & STB Escrow Compliance", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("11.1 Booking Lifecycle & Deposit Schedule", h2_style))
    story.append(Paragraph(
        "To commission a bespoke Voyanta journey, travelers follow a structured 3-phase booking process:",
        body_style
    ))
    booking_steps = [
        "<b>Phase 1: Bespoke Consultation & Proposal:</b> Following inquiry submission, a dedicated Senior Journey Curator produces a comprehensive, complimentary dossier within 24 hours.",
        "<b>Phase 2: Booking Confirmation Deposit (25%):</b> To lock hotel suite allocations, private chauffeur manifests, and Michelin chef counter reservations, a 25% booking deposit is required.",
        "<b>Phase 3: Final Balance Settlement (75%):</b> The remaining 75% balance is payable 30 days prior to the journey commencement date. For reservations made within 30 days of arrival, full payment is due upon confirmation."
    ]
    for bs in booking_steps:
        story.append(Paragraph(f"• {bs}", bullet_style))

    story.append(Paragraph("11.2 Singapore Tourism Board Consumer Safeguards", h2_style))
    story.append(Paragraph(
        "In compliance with Section 22 of the Travel Agents Act (Cap. 334), all payments received from clients are deposited directly into designated client trust escrow accounts. "
        "Funds are released to service suppliers (hotels, catamaran operators, private chauffeurs) only under verified contract fulfillment schedules, ensuring total consumer financial security.",
        body_style
    ))

    story.append(Paragraph("11.3 Accepted Payment Methods", h2_style))
    story.append(Paragraph("• International Bank Wire Transfer (SWIFT / Telegraphic Transfer in SGD, USD, EUR, GBP)", bullet_style))
    story.append(Paragraph("• Major Credit Cards (Visa, MasterCard, American Express, UnionPay) with 3D-Secure encryption", bullet_style))
    story.append(Paragraph("• Singapore Instant Payment Rails: PayNow QR, FAST, GIRO", bullet_style))
    story.append(Paragraph("• Zero credit card processing surcharges applied across all payment channels.", bullet_style))

    story.append(PageBreak())

    # ==================== CHAPTER 12 ====================
    story.append(Paragraph("Chapter 12: Cancellation Policies, Weather Shields & Amendment Terms", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("12.1 Flexible 30-Day Peace-of-Mind Guarantee", h2_style))
    story.append(Paragraph(
        "Voyanta recognizes that luxury travel plans require flexibility. We provide an industry-leading 30-day cancellation shield:",
        body_style
    ))

    canc_schedule = [
        [Paragraph("<b>Notice Period Prior to Arrival</b>", table_header_style), Paragraph("<b>Credit Note Option</b>", table_header_style), Paragraph("<b>Cash Refund Option</b>", table_header_style), Paragraph("<b>Concierge Policy Notes</b>", table_header_style)],
        [Paragraph("30 or more days", table_cell_bold), Paragraph("100% Full Credit Transfer", table_cell_bold), Paragraph("85% Cash Refund", table_cell_style), Paragraph("Credit note valid for 24 months across all Singapore experiences.", table_cell_style)],
        [Paragraph("15 to 29 days", table_cell_bold), Paragraph("100% Credit Note", table_cell_style), Paragraph("70% Cash Refund", table_cell_style), Paragraph("Subject to unrecoverable partner hotel deposit limits.", table_cell_style)],
        [Paragraph("7 to 14 days", table_cell_bold), Paragraph("75% Credit Note", table_cell_style), Paragraph("50% Cash Refund", table_cell_style), Paragraph("Rebooking dates permitted within same calendar year.", table_cell_style)],
        [Paragraph("Under 7 days / No-Show", table_cell_bold), Paragraph("Emergency Review", table_cell_style), Paragraph("0% Cash Refund", table_cell_style), Paragraph("Voyanta concierge facilitates maximum supplier recovery on best-effort basis.", table_cell_style)]
    ]
    t_canc = Table(canc_schedule, colWidths=[120, 110, 100, 174])
    t_canc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_secondary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_canc)
    story.append(Spacer(1, 10))

    story.append(Paragraph("12.2 Tropical Weather & Changi Flight Disruption Shield", h2_style))
    story.append(Paragraph(
        "If severe meteorological events or airline flight disruptions cause flight delays, cancellations, or diversions into Singapore Changi Airport, "
        "Voyanta automatically reschedules your private limousine transfers, itinerary timings, and hotel room reservations at zero administrative penalty.",
        body_style
    ))

    story.append(Paragraph("12.3 Medical & Force Majeure Safeguards", h2_style))
    story.append(Paragraph(
        "In the event of documented medical emergencies (supported by an official physician certificate) or recognized force majeure events, "
        "Voyanta waives standard cancellation timeframes and processes maximum refund recovery from luxury Singapore estate partners.",
        body_style
    ))

    story.append(Spacer(1, 10))

    # ==================== CHAPTER 13 ====================
    story.append(Paragraph("Chapter 13: 365-Day Seasonal Almanac, Climate & Annual Signature Events", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("13.1 Equatorial Tropical Climate Characteristics", h2_style))
    story.append(Paragraph(
        "Singapore is situated 1 degree north of the Equator, enjoying a warm tropical climate year-round with temperatures typically ranging between "
        "<b>24°C and 32°C (75°F to 90°F)</b>. Rainfall occurs in brief, intense tropical showers followed by clear skies. There is no traditional winter or cold season.",
        body_style
    ))
    story.append(Paragraph("• <b>Northeast Monsoon (Nov – Jan):</b> Cooler breezy afternoons with frequent short showers. Ideal for indoor cultural ateliers, luxury dining, and evening light displays.", bullet_style))
    story.append(Paragraph("• <b>Inter-Monsoon Period (Feb – Apr):</b> Clear skies, calm seas, warm sunny days. Prime season for Southern Islands catamaran charters, Lazarus beach days, and outdoor dining.", bullet_style))
    story.append(Paragraph("• <b>Southwest Monsoon (May – Sep):</b> Early morning 'Sumatra squalls' with pleasant dry afternoons. Season of the Singapore Grand Prix and Food Festival.", bullet_style))

    story.append(Paragraph("13.2 Major Annual Events & Premium Booking Windows", h2_style))
    events_data = [
        [Paragraph("<b>Annual Spectacle</b>", table_header_style), Paragraph("<b>Month</b>", table_header_style), Paragraph("<b>Atmosphere & Concierge Recommendation</b>", table_header_style)],
        [Paragraph("Singapore Grand Prix F1", table_cell_bold), Paragraph("September", table_cell_style), Paragraph("World's premier night street race around Marina Bay. Book packages 6–9 months in advance.", table_cell_style)],
        [Paragraph("Marina Bay Countdown", table_cell_bold), Paragraph("December 31", table_cell_style), Paragraph("Spectacular midnight fireworks over the bay. Suites at Fullerton Bay and Ritz-Carlton book out fast.", table_cell_style)],
        [Paragraph("Chinese New Year / River Hongbao", table_cell_bold), Paragraph("Jan / Feb", table_cell_style), Paragraph("Vibrant festive atmosphere in Chinatown, street illuminations, dragon dances, traditional feasts.", table_cell_style)],
        [Paragraph("Mid-Autumn Lantern Festival", table_cell_bold), Paragraph("Sep / Oct", table_cell_style), Paragraph("Supertree Grove giant illuminated lanterns at Gardens by the Bay; artisanal mooncake tastings.", table_cell_style)],
        [Paragraph("Singapore Food Festival", table_cell_bold), Paragraph("July / Aug", table_cell_style), Paragraph("Nationwide culinary celebrations, masterclasses with celebrity chefs, pop-up dining villages.", table_cell_style)]
    ]
    t_ev = Table(events_data, colWidths=[130, 80, 294])
    t_ev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_cream])
    ]))
    story.append(t_ev)

    story.append(PageBreak())

    # ==================== CHAPTER 14 ====================
    story.append(Paragraph("Chapter 14: Top 30 Frequently Asked Questions (FAQ) Matrix for AI Chatbot", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    faqs = [
        ("Q1: Can I customize every day of my Voyanta journey?",
         "Yes, absolutely. Voyanta specializes in 100% handcrafted bespoke itineraries. Every day plan, dining reservation, pace calibration, and accommodation is tailored to your desires by our Senior Journey Curators."),
        
        ("Q2: In what currency are Voyanta prices quoted and charged?",
         "All prices are quoted and settled in Singapore Dollars (SGD / S$). We provide real-time approximate conversions into USD, EUR, GBP, AUD, and JPY for reference."),

        ("Q3: Are taxes and service charges included in the published prices?",
         "Yes. Voyanta adheres to a transparent all-inclusive policy. All quoted rates include the 9% Singapore GST and 10% hospitality service charge. There are zero hidden fees."),

        ("Q4: Do I need a visa to visit Singapore?",
         "Passport holders from the US, UK, EU, Canada, Australia, Japan, and ASEAN enter visa-free for 30 to 90 days. PRC citizens enjoy a 30-day mutual exemption. Indian nationals and Level I/II nationalities require an e-Visa, which Voyanta facilitates."),

        ("Q5: What is the SG Arrival Card (SGAC)?",
         "The SG Arrival Card is a mandatory electronic entry and health declaration that every foreign visitor must submit online within 3 days prior to arrival. It is free via the official ICA website."),

        ("Q6: How far in advance should I book my Singapore journey?",
         "We recommend booking 4 to 8 weeks in advance for standard luxury itineraries, and 4 to 6 months in advance for peak periods such as the Singapore Grand Prix (September) or Festive Season (December)."),

        ("Q7: How does airport arrival work with Voyanta?",
         "Our standard luxury package includes private arrival coordination. For VIP upgrades, a dedicated Changi JetQuay representative meets you at the aircraft air-bridge, escorts you through private diplomatic customs, and transfers you into a chauffeured Mercedes-Maybach or Rolls-Royce."),

        ("Q8: What is Voyanta's cancellation policy?",
         "We offer a 30-Day Peace-of-Mind Guarantee: cancellations made 30+ days prior receive a 100% credit note (valid 24 months) or an 85% cash refund. Tiered refund options apply within 15–29 days."),

        ("Q9: What happens if my flight to Singapore is delayed or cancelled?",
         "Under our Weather & Flight Disruption Shield, Voyanta automatically rearranges your chauffeur transfers, hotel suites, and curated dining bookings at zero penalty if flights are disrupted."),

        ("Q10: Are Voyanta luxury itineraries child and family-friendly?",
         "Yes. We offer specialized Family Marvel journeys with private electric buggies at the Night Safari and Bird Paradise, VIP Universal Studios tours, and child-safe island catamaran excursions."),

        ("Q11: Can Voyanta cater to strict dietary requirements?",
         "Flawlessly. Our concierges coordinate directly with executive chefs across all dining venues for Halal, Kosher, Vegan, Jain, Gluten-Free, and severe allergy requirements."),

        ("Q12: Is tap water safe to drink in Singapore?",
         "Yes, 100%. Tap water in Singapore conforms strictly to World Health Organization (WHO) drinking water standards and is completely potable everywhere."),

        ("Q13: What is the tipping etiquette in Singapore?",
         "Tipping is not customary or expected in Singapore, as a 10% service charge is already included on bills. However, gratuities for exceptional chauffeur, butler, or guide service are graciously appreciated."),

        ("Q14: What is the dress code for Michelin restaurants in Singapore?",
         "Formal or smart casual (collared shirts, long trousers, and closed shoes for gentlemen; elegant day or evening wear for ladies). Avoid shorts, slippers, or athletic wear."),

        ("Q15: Can I book a private yacht to the Southern Islands through Voyanta?",
         "Yes. We offer private 50ft luxury catamarans to Lazarus Island and St. John's Island, complete with captain, crew, private butler, and gourmet picnic barbecues."),

        ("Q16: Is chewing gum allowed in Singapore?",
         "No. The import, sale, and general possession of chewing gum is strictly prohibited in Singapore under statutory law, except for approved dental or nicotine gum."),

        ("Q17: Are e-cigarettes or vapes permitted in Singapore?",
         "No. E-cigarettes, vapes, and e-liquids are strictly banned. Possession, purchase, or importation incurs severe fines of up to S$10,000 and possible prosecution. Do not pack them."),

        ("Q18: What is the best month to visit Singapore?",
         "Singapore is a year-round destination. February through April offers clear skies and calm waters for island sailing, while September features the world-renowned Singapore Grand Prix F1."),

        ("Q19: What hotel perks do I get when booking through Voyanta?",
         "Guaranteed room upgrades subject to availability, daily gourmet breakfast for two, S$150 estate credits, flexible 11 AM check-in / 4 PM check-out, and private butler orientation."),

        ("Q20: Can Voyanta arrange private chef buyouts at Odette?",
         "Yes. We coordinate exclusive chef counter buyouts with 3-Star Michelin Chef Julien Royer at the National Gallery, tailored for private celebrations."),

        ("Q21: How safe is Singapore for solo and female travelers?",
         "Singapore is consistently ranked among the top 3 safest cities in the world, with virtually non-existent violent crime, clean streets, and reliable 24/7 transport."),

        ("Q22: Does Voyanta offer Changi Airport layover tours?",
         "Yes. For layovers of 6 hours or more, we arrange express private chauffeur city tours covering Marina Bay, heritage quarters, and Jewel Changi with guaranteed on-time return."),

        ("Q23: What payment methods are accepted?",
         "Bank wire transfer, Visa, MasterCard, American Express, UnionPay, PayNow, and Apple Pay with zero credit card surcharges."),

        ("Q24: How are client deposits protected?",
         "All deposits are held in statutory client trust accounts in strict compliance with the Singapore Tourism Board Travel Agents Act (Cap. 334)."),

        ("Q25: What languages do Voyanta guides speak?",
         "All licensed guides speak fluent English. We also provide native French, Mandarin, Japanese, German, Russian, and Arabic specialist guides on request."),

        ("Q26: Can I purchase high-end items tax-free in Singapore?",
         "Yes. Visitors can claim an 8% GST refund on purchases over S$100 at participating luxury retailers using the electronic Tourist Refund Scheme (eTRS) at Changi Airport."),

        ("Q27: What is the dress code when visiting religious shrines?",
         "Modest dress covering shoulders and knees is required at temples and mosques. Shoes must be removed before entering Hindu temples, Buddhist halls, and mosques."),

        ("Q28: How fast does the Voyanta concierge respond?",
         "Our 24/7 dedicated WhatsApp VIP channel responds in under 5 minutes. Email inquiries receive a tailored proposal within 2 hours."),

        ("Q29: Can Voyanta arrange private helicopter transfers?",
         "Yes, helicopter panoramic city tours and private charter flights are coordinated with Seletar Aerospace Airport and authorized charter operators."),

        ("Q30: How do I initiate a booking consultation?",
         "Submit a private inquiry via our website form, contact our WhatsApp VIP line (+65 9123 4567), or email concierge@voyanta.sg to receive a dedicated proposal.")
    ]

    for q, a in faqs:
        story.append(Paragraph(f"<b>{q}</b>", h3_style))
        story.append(Paragraph(a, body_style))
        story.append(Spacer(1, 2))

    story.append(PageBreak())

    # ==================== CHAPTER 15 ====================
    story.append(Paragraph("Chapter 15: AI Chatbot Dialog Trees, Qualification Flow & Human Handover Schema", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=c_luxury, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("15.1 AI Qualification & Discovery Dialog Tree", h2_style))
    story.append(Paragraph(
        "When interacting with an incoming guest, the AI Chatbot should guide the conversation through four structured qualification stages:",
        body_style
    ))
    story.append(Paragraph("• <b>Step 1 (Travel Persona Discovery):</b> Inquire whether the traveler is visiting as a couple (honeymoon/anniversary), family with children, solo luxury explorer, or corporate executive.", bullet_style))
    story.append(Paragraph("• <b>Step 2 (Calendar & Duration Calibration):</b> Clarify intended travel dates, month of arrival, and duration in Singapore (e.g. 3-day weekend, 5-day signature, or 7-day Grand immersion).", bullet_style))
    story.append(Paragraph("• <b>Step 3 (Style & Experiences Alignment):</b> Identify primary passions: Haute Gastronomy, Southern Islands sailing, Heritage & Peranakan culture, Nature & wildlife, or Wellness spas.", bullet_style))
    story.append(Paragraph("• <b>Step 4 (Proposal & Contact Capture):</b> Recommend 1–2 specific Voyanta packages and VIP add-ons, calculate estimated investment in preferred currency, and collect guest contact details for senior curator follow-up.", bullet_style))

    story.append(Paragraph("15.2 Human Curator Handover Trigger Protocol", h2_style))
    story.append(Paragraph(
        "The AI Chatbot must automatically trigger a priority handover to a human Senior Journey Curator under any of the following conditions:",
        body_style
    ))
    handovers = [
        "Guest explicitly expresses intent to book, pay a deposit, or finalize travel dates.",
        "Inquiries involving groups of 8 or more travelers, corporate buyouts, or private jet manifests.",
        "Custom itinerary requests exceeding S$10,000 in total investment.",
        "Complex medical, mobility, or diplomatic security requirements.",
        "Direct user request to 'speak with a human' or 'talk to a concierge'."
    ]
    for ho in handovers:
        story.append(Paragraph(f"• {ho}", bullet_style))

    story.append(Paragraph("15.3 Structured Lead Capture JSON Schema", h2_style))
    story.append(Paragraph(
        "When capturing lead data for handover, the AI Chatbot formats the dossier using the following JSON payload specification:",
        body_style
    ))

    json_snippet = (
        "{\n"
        '  "lead_type": "HIGH_INTENT_VIP_COMMISSION",\n'
        '  "guest_profile": {\n'
        '    "full_name": "string",\n'
        '    "email_address": "string",\n'
        '    "contact_number": "string",\n'
        '    "country_of_residence": "string"\n'
        '  },\n'
        '  "travel_parameters": {\n'
        '    "target_package": "PKG001 - Singapore Presidential Grandeur",\n'
        '    "party_size": 2,\n'
        '    "travel_dates": "15-20 October 2026",\n'
        '    "selected_pace": "Immersive",\n'
        '    "preferred_hotel": "Raffles Hotel Singapore",\n'
        '    "selected_addons": ["Changi Tarmac VIP Meet", "Odette 3-Star Buyout"]\n'
        '  },\n'
        '  "financial_estimate": {\n'
        '    "base_package_sgd": 2850,\n'
        '    "vip_addons_sgd": 1030,\n'
        '    "total_estimated_sgd": 3880,\n'
        '    "converted_currency": "USD",\n'
        '    "total_converted": 2871.20\n'
        '  },\n'
        '  "special_requests": "15th Anniversary celebration, strict gluten-free for spouse",\n'
        '  "escalation_sla_minutes": 15\n'
        "}"
    )
    story.append(Paragraph(f"<pre>{json_snippet}</pre>", ParagraphStyle('CodeBlock', fontName='Courier', fontSize=7.5, leading=10, textColor=c_primary, spaceBefore=4, spaceAfter=8)))

    # End mark
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_luxury, spaceBefore=10, spaceAfter=15))
    story.append(Paragraph("<b>VOYANTA PRIVATE ATELIER SINGAPORE • END OF KNOWLEDGE BASE DOSSIER</b>", ParagraphStyle('End', fontName='Helvetica-Bold', fontSize=9, leading=12, alignment=1, textColor=c_primary)))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {pdf_filename}!")

    # Also copy to public folder if it exists
    pub_dir = "public"
    if os.path.exists(pub_dir):
        import shutil
        dest = os.path.join(pub_dir, pdf_filename)
        shutil.copyfile(pdf_filename, dest)
        print(f"Copied PDF to {dest}!")

if __name__ == "__main__":
    build_pdf()
