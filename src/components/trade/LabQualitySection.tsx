import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck,
  CheckCircle2,
  X,
  Printer,
  Download,
  Flame,
  Droplet,
  Microscope,
  PackageCheck
} from 'lucide-react';

interface LabParameter {
  name: string;
  testMethod: string;
  result: string;
  agmarkStandard: string;
  status: 'Pass' | 'Exceeds Standard';
}

const LAB_PARAMETERS: LabParameter[] = [
  {
    name: 'Free Fatty Acids (FFA as Oleic Acid)',
    testMethod: 'IS 548 (Part 1) : Titrimetric',
    result: '0.36% (Ultra-Low)',
    agmarkStandard: 'Max 1.50%',
    status: 'Exceeds Standard'
  },
  {
    name: 'Allyl Isothiocyanate (Natural Pungency)',
    testMethod: 'Gas Chromatography (GC-FID)',
    result: '0.34% Volatile Oil',
    agmarkStandard: 'Min 0.28%',
    status: 'Exceeds Standard'
  },
  {
    name: 'Test for Argemone Oil',
    testMethod: 'Thin Layer Chromatography (TLC)',
    result: 'Negative (Absent)',
    agmarkStandard: 'Negative',
    status: 'Pass'
  },
  {
    name: 'Test for Mineral Oil (Holdes Test)',
    testMethod: 'IS 548 (Part 2) Saponification',
    result: 'Negative (Absent)',
    agmarkStandard: 'Negative',
    status: 'Pass'
  },
  {
    name: 'Moisture & Insoluble Impurities',
    testMethod: 'Air Oven Method at 105°C',
    result: '0.07% (Moisture Free)',
    agmarkStandard: 'Max 0.25%',
    status: 'Exceeds Standard'
  },
  {
    name: 'Refractive Index at 40°C',
    testMethod: 'Abbe Refractometer',
    result: '1.4652',
    agmarkStandard: '1.4646 – 1.4662',
    status: 'Pass'
  },
  {
    name: 'Color Value (Lovibond in 1/4" Cell)',
    testMethod: 'Lovibond Tintometer (Y+5R)',
    result: '18.2 Y + 2.1 R (Honey Gold)',
    agmarkStandard: 'Max 50.0 Units',
    status: 'Pass'
  },
  {
    name: 'Bellier Turbidity Temperature (BTT)',
    testMethod: 'Acetic Acid Solubilization',
    result: '24.8°C',
    agmarkStandard: '23.0°C – 27.5°C',
    status: 'Pass'
  }
];

interface LabQualitySectionProps {
  onRequestSample?: () => void;
}

export const LabQualitySection: React.FC<LabQualitySectionProps> = ({ onRequestSample }) => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <section className="py-16 sm:py-24 bg-cream-100/60 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-900 text-mustard-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Microscope className="w-3.5 h-3.5 text-mustard-400" />
              <span>NABL Accredited Quality Protocol</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-forest-950 tracking-tight mb-4">
              Zero Adulteration Guarantee & Lab Certified Purity
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every single crushing batch of Prime Fresh Mustard Oil is tested in our in-house QC laboratory and third-party NABL certified facilities. We guarantee 100% pure kachi ghani with zero argemone, zero mineral oil, and industry-leading volatile pungency.
            </p>
          </div>

          {/* 4 Feature Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 mb-1">
                &gt;0.32% High Pungency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Slow traditional expeller cold pressing retains natural Allyl Isothiocyanate (AITC), ensuring the pungent aroma and taste wholesalers demand.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 mb-1">
                Zero Argemone & Solvents
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                TLC tested negative for argemone, castor oil, and solvent traces. 100% mechanical extraction with zero hexane or chemical additives.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 mb-1">
                Agmark Grade-1 Standard
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified under Directorate of Marketing & Inspection (Govt. of India) Agmark Grade-1 specifications with individual CA batch marks.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-cream-200 shadow-xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 mb-1">
                Ultra-Low FFA (&lt;0.5%)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Crushed exclusively from newly harvested mature Rajasthan yellow seeds, keeping free fatty acids below 0.50% for maximum shelf life.
              </p>
            </div>
          </div>

          {/* Interactive Lab Certificate Banner */}
          <div className="bg-forest-950 text-cream-50 rounded-3xl p-6 sm:p-10 border border-forest-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-mustard-400 text-xs font-bold uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Current Godown Batch: PFM-YMO-2026-B104</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
                View Official Laboratory Certificate of Analysis (COA)
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Examine our complete 8-point parameter test sheet including Gas Chromatography, Lovibond clarity, and Bellier temperature pass certifications for current dispatches.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowCertificateModal(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-mustard-500 hover:bg-mustard-400 text-forest-950 font-bold text-sm tracking-wide transition shadow-lg shadow-mustard-500/20 flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4 text-forest-950" />
                <span>View Batch COA Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onRequestSample) {
                    onRequestSample();
                  } else {
                    window.dispatchEvent(new CustomEvent('open-sample-kit-modal'));
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-cream-100 font-bold text-sm tracking-wide transition border border-forest-600 flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4 text-mustard-400" />
                <span>Request Free 500ml Sample</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Certificate of Analysis (COA) Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white text-forest-950 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-cream-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-forest-950 text-cream-50 p-4 sm:p-5 flex items-center justify-between rounded-t-2xl border-b border-forest-800 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
                  <Award className="w-6 h-6 text-mustard-600" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-cream-50">
                    Certificate of Analysis (COA)
                  </h3>
                  <p className="text-xs text-mustard-300 font-medium">
                    Batch # PFM-YMO-2026-B104 · Agmark Grade-1 Verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-700 text-cream-100 text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Print Certificate"
                >
                  <Printer className="w-3.5 h-3.5 text-mustard-400" />
                  <span className="hidden sm:inline">Print / Save</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="p-1.5 rounded-lg hover:bg-forest-800 text-slate-300 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Certificate Paper */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Mill Letterhead */}
              <div className="border-b-2 border-forest-900 pb-4 text-center">
                <div className="font-serif font-black text-2xl tracking-tight text-forest-950">
                  PRIME FRESH OIL MILLS
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Manufacturers & Exporters of Pure Cold-Pressed Kachi Ghani Mustard Oil & Mustard Cake
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Works: Alwar-Bharatpur Highway, Industrial Area, Alwar, Rajasthan - 301001 (India)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-[10px] text-forest-800 font-semibold">
                  <span>FSSAI Lic: 10019013002241</span>
                  <span>•</span>
                  <span>Agmark Certificate No: AG/RJ/ALW/8412</span>
                  <span>•</span>
                  <span>GSTIN: 08AAECP4921C1Z4</span>
                </div>
              </div>

              {/* Sample & Batch Meta */}
              <div className="bg-cream-50 p-4 rounded-xl border border-cream-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Product Name</span>
                  <strong className="text-forest-950">Prime Fresh Pure Yellow Mustard Oil</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Batch Number</span>
                  <strong className="text-forest-950">PFM-YMO-2026-B104</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Date of Milling</span>
                  <strong className="text-forest-950">October 24, 2026</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Best Before</span>
                  <strong className="text-forest-950">12 Months (Oct 2027)</strong>
                </div>
              </div>

              {/* Parameter Table */}
              <div>
                <h4 className="font-serif font-bold text-sm text-forest-950 mb-2 uppercase tracking-wider">
                  Laboratory Test Results vs. Agmark Standards
                </h4>
                <div className="overflow-x-auto border border-cream-200 rounded-xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-cream-100 text-forest-900 font-bold uppercase text-[10px] tracking-wider border-b border-cream-200">
                      <tr>
                        <th className="py-2.5 px-3">Test Parameter</th>
                        <th className="py-2.5 px-3">Standard Test Protocol</th>
                        <th className="py-2.5 px-3 text-right">Agmark Grade-1</th>
                        <th className="py-2.5 px-3 text-right">Lab Result</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-100 text-slate-700">
                      {LAB_PARAMETERS.map((p, idx) => (
                        <tr key={idx} className="hover:bg-cream-50/50">
                          <td className="py-2.5 px-3 font-semibold text-forest-950">{p.name}</td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-500">{p.testMethod}</td>
                          <td className="py-2.5 px-3 text-right font-medium text-slate-600">{p.agmarkStandard}</td>
                          <td className="py-2.5 px-3 text-right font-bold text-forest-950">{p.result}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quality Officer Verdict & Stamp */}
              <div className="border-t border-cream-200 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                <div>
                  <span className="font-bold text-forest-900 block">Final Laboratory Opinion:</span>
                  <p className="text-slate-600 text-[11px]">
                    The submitted sample complies with Agmark Grade-1 (Kachi Ghani Mustard Oil) and FSSAI (Food Safety Standards) Regulations. Conforms to authentic cold-pressed specification.
                  </p>
                </div>

                <div className="text-center border border-forest-200 rounded-xl p-3 bg-forest-50/50 min-w-[200px]">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">Digitally Verified & Approved</div>
                  <div className="font-serif font-black text-forest-950 mt-1">Dr. Rajesh V. Sharma</div>
                  <div className="text-[10px] text-forest-700">Chief Quality Chemist (M.Sc., NABL Lead Auditor)</div>
                  <div className="text-[9px] text-slate-400 mt-1">Prime Fresh Central Testing Lab</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-cream-200">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-cream-50 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-mustard-400" />
                  <span>Download Signed COA</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

