/* provider-directory.js — shared by auth_wizard_full_15.html and um-nav.html (same folder, loaded with a
   plain <script src>). One directory + one "Search Provider" modal, so a provider picked in the wizard
   and one picked on an auth's line item carry the same identifiers.
   Deploy note: um-nav-site needs this file alongside index.html and the wizard. */
(function () {
/* ---------- provider directory ----------
   kind: prov (physician/NPP), fac (facility), dent (dentist), dgrp (dental group).
   Specialty comes from the provider, narrowed by location: a location's `specs` lists what the provider
   is credentialed to practise THERE (e.g. Dr. Obi does cardiology only at the heart clinic). A location
   without `specs` offers all of the provider's specialties. `net` is per location because network
   participation is contracted per site/TIN — the OON rule needs it at that level. Provider # (payer-assigned),
   Network ID and contract Policy #s are per location for the same reason; an OON site carries no Network ID
   and no policy, which is what makes a Single Case Agreement the question. Group # is the billing group. */
const PROVIDER_DIR=[
  {id:'P-OBI', groupNum:'GRP-20417', groupName:'Obi Internal Medicine Group', name:'Dr. Samuel Obi', cred:'MD', npi:'1285736491', kind:'prov', specialties:['Internal Medicine','Cardiology'], locations:[
    {id:'OBI-1', provNum:'PRV4401137', state:'FL', networkId:'FLN-MED-107', policyNums:['PC-2026-1231'], name:'Obi Internal Medicine – Main Office', addr:'2100 Lakeview Dr, Ste 300, Tampa, FL 33606', tin:'59-2231870', net:'In-Network'},
    {id:'OBI-2', provNum:'PRV4401274', state:'FL', networkId:'FLN-MED-114', policyNums:['PC-2026-1262'], name:'Mercy Heart & Vascular Clinic', addr:'455 Mercy Way, Bldg C, Tampa, FL 33607', tin:'59-1180442', net:'In-Network', specs:['Cardiology']},
    {id:'OBI-3', provNum:'PRV4401411', state:'FL', networkId:'FLN-MED-121', policyNums:['PC-2026-1293','PC-2025-0851'], name:'Westshore Satellite Clinic', addr:'4830 W Kennedy Blvd, Tampa, FL 33609', tin:'59-2231870', net:'In-Network', specs:['Internal Medicine']}]},
  {id:'P-PATEL', groupNum:'GRP-31188', groupName:'Bayside Orthopaedic Partners', name:'Dr. Anita Patel', cred:'MD', npi:'1649382017', kind:'prov', specialties:['Orthopaedic Surgery','Sports Medicine'], locations:[
    {id:'PAT-1', provNum:'PRV4401548', state:'FL', networkId:'FLN-MED-128', policyNums:['PC-2026-1324'], name:'Bayside Orthopaedics', addr:'1201 Bayshore Blvd, Tampa, FL 33606', tin:'59-3310076', net:'In-Network'},
    {id:'PAT-2', provNum:'PRV4401685', state:'FL', networkId:'', policyNums:[], name:'Clearwater Sports Medicine Center', addr:'300 Court St, Clearwater, FL 33756', tin:'59-4471903', net:'Out-of-Network', specs:['Sports Medicine']}]},
  {id:'P-REYES', groupNum:'GRP-27740', groupName:'Harbor Behavioral Associates PA', name:'Dr. Luis Reyes', cred:'MD', npi:'1932047765', kind:'prov', specialties:['Psychiatry','Child & Adolescent Psychiatry'], locations:[
    {id:'REY-1', provNum:'PRV4401822', state:'FL', networkId:'FLN-BH-142', policyNums:['PC-2026-1386','PC-2025-0902'], name:'Harbor Behavioral Associates', addr:'880 Harbor Island Blvd, Tampa, FL 33602', tin:'59-2877014', net:'In-Network'},
    {id:'REY-2', provNum:'PRV4401959', state:'FL', networkId:'FLN-BH-149', policyNums:['PC-2026-1417'], name:'Harbor Behavioral – Telehealth', addr:'Virtual visit (FL licensed)', tin:'59-2877014', net:'In-Network', specs:['Psychiatry']}]},
  {id:'P-KIM', groupNum:'GRP-39052', groupName:'Suncoast Pulmonary Group', name:'Dr. Hannah Kim', cred:'DO', npi:'1407729358', kind:'prov', specialties:['Pulmonary Disease','Critical Care Medicine'], locations:[
    {id:'KIM-1', provNum:'PRV4402096', state:'FL', networkId:'FLN-MED-156', policyNums:['PC-2026-1448'], name:'Suncoast Pulmonary & Sleep', addr:'2901 W Swann Ave, Tampa, FL 33609', tin:'59-3905521', net:'In-Network', specs:['Pulmonary Disease']},
    {id:'KIM-2', provNum:'PRV4402233', state:'FL', networkId:'FLN-MED-163', policyNums:['PC-2026-1479','PC-2025-0953'], name:'Mercy General Hospital – ICU', addr:'455 Mercy Way, Tampa, FL 33607', tin:'59-1180442', net:'In-Network', specs:['Critical Care Medicine']}]},
  {id:'P-BELL', groupNum:'GRP-40126', groupName:'Riverview Family Health LLC', name:'Marcus Bell', cred:'NP', npi:'1760394128', kind:'prov', specialties:['Family Medicine'], locations:[
    {id:'BEL-1', provNum:'PRV4402370', state:'FL', networkId:'FLN-MED-170', policyNums:['PC-2026-1510'], name:'Riverview Family Health', addr:'10330 Big Bend Rd, Riverview, FL 33578', tin:'59-4012698', net:'In-Network'}]},
  {id:'P-LIU', groupNum:'GRP-26501', groupName:'Gulf Coast Oncology Group', name:'Dr. Grace Liu', cred:'MD', npi:'1528840036', kind:'prov', specialties:['Medical Oncology','Hematology'], locations:[
    {id:'LIU-1', provNum:'PRV4402507', state:'FL', networkId:'FLN-MED-177', policyNums:['PC-2026-1541'], name:'Gulf Coast Cancer Institute', addr:'12902 USF Magnolia Dr, Tampa, FL 33612', tin:'59-2650187', net:'In-Network'},
    {id:'LIU-2', provNum:'PRV4402644', state:'FL', networkId:'FLN-MED-184', policyNums:['PC-2026-1572','PC-2025-1004'], name:'Gulf Coast Infusion – Brandon', addr:'600 Vonderburg Dr, Brandon, FL 33511', tin:'59-2650187', net:'In-Network', specs:['Hematology']}]},
  {id:'F-MERCY', groupNum:'GRP-11804', groupName:'Mercy Health System', name:'Mercy General Hospital', npi:'1093817264', kind:'fac', specialties:['Acute Care Hospital'], locations:[
    {id:'MER-1', provNum:'PRV4402781', state:'FL', networkId:'FLN-MED-191', policyNums:['PC-2026-1603'], name:'Main Campus', addr:'455 Mercy Way, Tampa, FL 33607', tin:'59-1180442', net:'In-Network'},
    {id:'MER-2', provNum:'PRV4402918', state:'FL', networkId:'FLN-MED-198', policyNums:['PC-2026-1634'], name:'North Pavilion – Inpatient Rehab Unit', addr:'470 Mercy Way, Tampa, FL 33607', tin:'59-1180442', net:'In-Network', specs:['Inpatient Rehabilitation Facility']}]},
  {id:'F-STJ', groupNum:'GRP-06241', groupName:'St. Joseph\'s Health', name:"St. Joseph's Behavioral Health Center", npi:'1174520983', kind:'fac', specialties:['Psychiatric Hospital'], locations:[
    {id:'STJ-1', provNum:'PRV4403055', state:'FL', networkId:'FLN-BH-205', policyNums:['PC-2026-1665','PC-2025-1055'], name:'Inpatient Campus', addr:'4700 N Habana Ave, Tampa, FL 33614', tin:'59-0624113', net:'In-Network'}]},
  {id:'F-COAST', groupNum:'GRP-37899', groupName:'Coastal Care Holdings', name:'Coastal Skilled Nursing & Rehab', npi:'1356098142', kind:'fac', specialties:['Skilled Nursing Facility'], locations:[
    {id:'CST-1', provNum:'PRV4403192', state:'FL', networkId:'', policyNums:[], name:'Coastal – South Tampa', addr:'3810 W Bay to Bay Blvd, Tampa, FL 33629', tin:'59-3789920', net:'Out-of-Network'}]},
  {id:'F-RAD', groupNum:'GRP-20198', groupName:'Radiology Associates of Tampa', name:'Radiology Associates', npi:'1811203459', kind:'fac', specialties:['Diagnostic Radiology','Independent Diagnostic Testing Facility'], locations:[
    {id:'RAD-1', provNum:'PRV4403329', state:'FL', networkId:'FLN-MED-219', policyNums:['PC-2026-1727'], name:'Imaging Center – Westshore', addr:'4200 W Cypress St, Tampa, FL 33607', tin:'59-2019834', net:'In-Network'},
    {id:'RAD-2', provNum:'PRV4403466', state:'FL', networkId:'FLN-MED-226', policyNums:['PC-2026-1758','PC-2025-1106'], name:'Imaging Center – Brandon', addr:'1540 Oakfield Dr, Brandon, FL 33511', tin:'59-2019834', net:'In-Network'},
    {id:'RAD-3', provNum:'PRV4403603', state:'FL', networkId:'', policyNums:[], name:'Open MRI – Carrollwood', addr:'13305 N Dale Mabry Hwy, Tampa, FL 33618', tin:'59-5102277', net:'Out-of-Network', specs:['Independent Diagnostic Testing Facility']}]},
  {id:'F-HH', groupNum:'GRP-33480', groupName:'Suncoast Home Health Inc', name:'Suncoast Home Health', npi:'1245087731', kind:'fac', specialties:['Home Health Agency'], locations:[
    {id:'HH-1', provNum:'PRV4403740', state:'FL', networkId:'FLN-MED-240', policyNums:['PC-2026-1820'], name:'Hillsborough Branch', addr:'5401 W Kennedy Blvd, Tampa, FL 33609', tin:'59-3348011', net:'In-Network'}]},
  {id:'F-INF', groupNum:'GRP-17403', groupName:'BayCare Health System', name:'BayCare Infusion Center', npi:'1669420155', kind:'fac', specialties:['Ambulatory Infusion Center'], locations:[
    {id:'INF-1', provNum:'PRV4403877', state:'FL', networkId:'FLN-MED-247', policyNums:['PC-2026-1851','PC-2025-1157'], name:'St. Petersburg', addr:'701 6th St S, St. Petersburg, FL 33701', tin:'59-1740338', net:'In-Network'}]},
  {id:'D-ANAND', groupNum:'GRP-24661', groupName:'Riverside Dental Group PA', name:'Dr. Priya Anand', cred:'DDS', npi:'1487263390', kind:'dent', specialties:['General Dentistry','Endodontics'], locations:[
    {id:'AND-1', provNum:'PRV4404014', state:'FL', networkId:'FLN-DN-254', policyNums:['PC-2026-1882'], name:'Riverside Dental Group – Downtown', addr:'201 N Franklin St, Tampa, FL 33602', tin:'59-2466105', net:'In-Network'},
    {id:'AND-2', provNum:'PRV4404151', state:'FL', networkId:'FLN-DN-261', policyNums:['PC-2026-1913'], name:'Riverside Endodontics', addr:'3001 N Rocky Point Dr, Tampa, FL 33607', tin:'59-2466105', net:'In-Network', specs:['Endodontics']}]},
  {id:'D-HADDAD', groupNum:'GRP-30128', groupName:'Tampa Oral Surgery PA', name:'Dr. Omar Haddad', cred:'DMD', npi:'1598032746', kind:'dent', specialties:['Oral & Maxillofacial Surgery'], locations:[
    {id:'HAD-1', provNum:'PRV4404288', state:'FL', networkId:'FLN-DN-268', policyNums:['PC-2026-1944','PC-2025-1208'], name:'Tampa Oral Surgery', addr:'2727 W Dr MLK Jr Blvd, Tampa, FL 33607', tin:'59-3012874', net:'In-Network'}]},
  {id:'D-RDG', groupNum:'GRP-24661', groupName:'Riverside Dental Group PA', name:'Riverside Dental Group', npi:'1730049812', kind:'dgrp', specialties:['General Dentistry','Periodontics','Orthodontics'], locations:[
    {id:'RDG-1', provNum:'PRV4404425', state:'FL', networkId:'FLN-DN-275', policyNums:['PC-2026-1975'], name:'Downtown Office', addr:'201 N Franklin St, Tampa, FL 33602', tin:'59-2466105', net:'In-Network'},
    {id:'RDG-2', provNum:'PRV4404562', state:'FL', networkId:'FLN-DN-282', policyNums:['PC-2026-2006'], name:'Brandon Office', addr:'910 W Lumsden Rd, Brandon, FL 33511', tin:'59-2466105', net:'In-Network', specs:['General Dentistry','Orthodontics']}]}
];
// Providers referenced by um-nav's seeded demo cases (James/Eleanor/etc. inpatient, Maria, Robert Chen,
// the dental demo), so those auths resolve to real directory entries instead of bare names.
PROVIDER_DIR.push(
  {id:'P-VASQ', groupNum:'GRP-51207', groupName:'Bronx Behavioral Health Associates PC', name:'Dr. Elena Vasquez', cred:'MD', npi:'1555667788', kind:'prov', specialties:['Psychiatry'], locations:[
    {id:'VAS-1', provNum:'PRV5102214', state:'NY', networkId:'NYN-BH-214', policyNums:['PC-2026-3310'], name:'Bronx Behavioral Health Associates', addr:'1776 Grand Concourse, Ste 4B, Bronx, NY 10457', tin:'13-4471820', net:'In-Network'}]},
  {id:'F-MERID', groupNum:'GRP-51330', groupName:'Meridian Behavioral Health System', name:'Meridian Behavioral Health Center', npi:'1666778899', kind:'fac', specialties:['Partial Hospitalization Program','Psychiatric Facility'], locations:[
    {id:'MRD-1', provNum:'PRV5104470', state:'NY', networkId:'NYN-BH-230', policyNums:['PC-2026-3325','PC-2025-2210'], name:'Meridian – Fordham PHP', addr:'2432 Grand Concourse, Bronx, NY 10458', tin:'13-3092561', net:'In-Network', specs:['Partial Hospitalization Program']}]},
  {id:'P-TORRES', groupNum:'GRP-62018', groupName:'Springfield Orthopedic Associates', name:'Dr. Michael Torres', cred:'MD', npi:'1234567890', kind:'prov', specialties:['Orthopaedic Surgery','Sports Medicine'], locations:[
    {id:'TOR-1', provNum:'PRV6200815', state:'CO', networkId:'CON-MED-118', policyNums:['PC-2026-4102'], name:'Springfield Orthopedic Associates', addr:'1450 Main St, Springfield, CO 81073', tin:'84-2210374', net:'In-Network'}]},
  {id:'F-SPRSM', groupNum:'GRP-62045', groupName:'Springfield Surgical Partners', name:'Springfield Sports Medicine Surgery Center', npi:'1740028815', kind:'fac', specialties:['Ambulatory Surgical Center'], locations:[
    {id:'SSM-1', provNum:'PRV6201932', state:'CO', networkId:'CON-MED-126', policyNums:['PC-2026-4118'], name:'Main ASC', addr:'1500 Main St, Springfield, CO 81073', tin:'84-3318092', net:'In-Network'}]},
  {id:'F-SPROA', groupNum:'GRP-62018', groupName:'Springfield Orthopedic Associates', name:'Springfield Orthopedic Associates', npi:'1740031190', kind:'fac', specialties:['Orthopaedic Surgery Group Practice'], locations:[
    {id:'SOA-1', provNum:'PRV6200816', state:'CO', networkId:'CON-MED-118', policyNums:['PC-2026-4102'], name:'Main Office', addr:'1450 Main St, Springfield, CO 81073', tin:'84-2210374', net:'In-Network'}]},
  {id:'P-NAIR', groupNum:'GRP-40881', groupName:'Riverside Hospitalist Group', name:'Dr. Priya Nair', cred:'MD', npi:'1386620417', kind:'prov', specialties:['Hospitalist','Internal Medicine'], locations:[
    {id:'NAI-1', provNum:'PRV4406130', state:'FL', networkId:'FLN-MED-240', policyNums:['PC-2026-1880'], name:'Riverside Medical Center – Hospitalist Service', addr:'6001 Webb Rd, Tampa, FL 33615', tin:'59-4120733', net:'In-Network'}]},
  {id:'P-TRAN', groupNum:'GRP-40902', groupName:'St. Anthony Critical Care Physicians', name:'Dr. Michael Tran', cred:'MD', npi:'1467201938', kind:'prov', specialties:['Critical Care Medicine'], locations:[
    {id:'TRN-1', provNum:'PRV4406288', state:'FL', networkId:'FLN-MED-247', policyNums:['PC-2026-1894'], name:'St. Anthony Medical Center – ICU', addr:'1200 7th Ave N, St. Petersburg, FL 33705', tin:'59-0719244', net:'In-Network'}]},
  {id:'P-ALONZO', groupNum:'GRP-40955', groupName:'Golden Oak Medical Associates', name:'Dr. Patricia Alonzo', cred:'MD', npi:'1538817260', kind:'prov', specialties:['Geriatric Medicine','SNF Medical Director'], locations:[
    {id:'ALZ-1', provNum:'PRV4406412', state:'FL', networkId:'FLN-MED-254', policyNums:['PC-2026-1901'], name:'Golden Oak Skilled Nursing & Rehabilitation', addr:'8800 N 56th St, Temple Terrace, FL 33617', tin:'59-3871106', net:'In-Network'}]},
  {id:'P-DELG', groupNum:'GRP-41007', groupName:'Lakeview Pulmonary Associates', name:'Dr. Susan Delgado', cred:'MD', npi:'1619903547', kind:'prov', specialties:['Pulmonology & Critical Care','Pulmonary Disease'], locations:[
    {id:'DLG-1', provNum:'PRV4406577', state:'FL', networkId:'FLN-MED-261', policyNums:['PC-2026-1915'], name:'Lakeview Regional Medical Center', addr:'2800 Lakeview Pkwy, Lakeland, FL 33805', tin:'59-2980415', net:'In-Network'}]},
  {id:'F-RIVMC', groupNum:'GRP-40880', groupName:'Riverside Health', name:'Riverside Medical Center', npi:'1093882017', kind:'fac', specialties:['Acute Care Hospital'], locations:[
    {id:'RMC-1', provNum:'PRV4406101', state:'FL', networkId:'FLN-MED-240', policyNums:['PC-2026-1880'], name:'Main Campus', addr:'6001 Webb Rd, Tampa, FL 33615', tin:'59-4120733', net:'In-Network'}]},
  {id:'F-STANT', groupNum:'GRP-40900', groupName:'St. Anthony Health', name:'St. Anthony Medical Center', npi:'1174613308', kind:'fac', specialties:['Acute Care Hospital'], locations:[
    {id:'SAM-1', provNum:'PRV4406250', state:'FL', networkId:'FLN-MED-247', policyNums:['PC-2026-1894'], name:'Main Campus', addr:'1200 7th Ave N, St. Petersburg, FL 33705', tin:'59-0719244', net:'In-Network'}]},
  {id:'F-GOLD', groupNum:'GRP-40955', groupName:'Golden Oak Senior Care', name:'Golden Oak Skilled Nursing & Rehabilitation', npi:'1255038841', kind:'fac', specialties:['Skilled Nursing Facility'], locations:[
    {id:'GOK-1', provNum:'PRV4406401', state:'FL', networkId:'FLN-MED-254', policyNums:['PC-2026-1901'], name:'Temple Terrace', addr:'8800 N 56th St, Temple Terrace, FL 33617', tin:'59-3871106', net:'In-Network'}]},
  {id:'F-LAKE', groupNum:'GRP-41000', groupName:'Lakeview Health Partners', name:'Lakeview Regional Medical Center', npi:'1336199024', kind:'fac', specialties:['Acute Care Hospital','Long-Term Acute Care Hospital'], locations:[
    {id:'LRM-1', provNum:'PRV4406560', state:'FL', networkId:'FLN-MED-261', policyNums:['PC-2026-1915'], name:'Main Campus', addr:'2800 Lakeview Pkwy, Lakeland, FL 33805', tin:'59-2980415', net:'In-Network'}]},
  {id:'D-BELLO', groupNum:'GRP-24661', groupName:'Riverside Dental Group PA', name:'Dr. Aisha Bello', cred:'DDS', npi:'1902284476', kind:'dent', specialties:['General Dentistry'], locations:[
    {id:'BLO-1', provNum:'PRV4407705', state:'FL', networkId:'FLN-DN-160', policyNums:['PC-2026-2044'], name:'Riverside Dental Group – Brandon', addr:'910 W Lumsden Rd, Brandon, FL 33511', tin:'59-2466105', net:'In-Network'}]}
);

// Derived per-location display fields (zip, phone, tier, license) — filled once here rather than typed
// on every row above. Tier: in-network sites are Tier 1 unless flagged; OON sites have no tier.
PROVIDER_DIR.forEach(function (p, pi) {
  p.locations.forEach(function (l, li) {
    var z = /(\d{5})\s*$/.exec(l.addr || ''); l.zip = l.zip || (z ? z[1] : '');
    var n = 2000000 + (pi * 7919 + li * 104729) % 7999999;
    l.phone = l.phone || ({ NY: '718', CO: '719' }[l.state] || '813') + String(n).slice(0, 7);
    l.tier = l.net === 'In-Network' ? (l.tier || (pi % 4 === 3 ? 2 : 1)) : null;
    l.license = l.license || 'Active';
  });
});

function pdFind(id) { return PROVIDER_DIR.find(function (p) { return p.id === id; }) || null; }
function pdLoc(p, locId) { return p ? (p.locations.find(function (l) { return l.id === locId; }) || null) : null; }
function pdSpecsAt(p, l) { return (l && l.specs) || (p ? p.specialties : []); }
// Resolve a bare seeded name like "Dr. Samuel Obi, Cardiology" → provider + first location, with the
// suffix used as the specialty when it's one the provider actually holds at that location.
function pdFindByName(name) {
  if (!name) return null;
  var parts = String(name).split(',');
  var base = parts[0].trim().toLowerCase(), suffix = (parts[1] || '').trim();
  var p = PROVIDER_DIR.find(function (x) { return x.name.toLowerCase() === base; });
  if (!p) return null;
  // Prefer a site credentialed specifically for that specialty (Obi's cardiology → the heart clinic).
  var l = (suffix && (p.locations.find(function (x) { return x.specs && x.specs.indexOf(suffix) >= 0; })
    || p.locations.find(function (x) { return pdSpecsAt(p, x).indexOf(suffix) >= 0; }))) || p.locations[0];
  var specs = pdSpecsAt(p, l);
  return pdDetail(p, l, specs.indexOf(suffix) >= 0 ? suffix : specs[0]);
}
// Flat record handed to callers — what gets stored on an auth or line.
function pdDetail(p, l, spec) {
  return {
    id: p.id, name: p.name, cred: p.cred || '', npi: p.npi, kind: p.kind, groupNum: p.groupNum, groupName: p.groupName,
    locationId: l ? l.id : '', location: l ? l.name : '', address: l ? l.addr : '', zip: l ? l.zip : '', phone: l ? l.phone : '',
    state: l ? l.state : '', tin: l ? l.tin : '', provNum: l ? l.provNum : '', networkId: l ? l.networkId : '',
    policyNums: l ? l.policyNums.slice() : [], network: l ? l.net : '', tier: l ? l.tier : null, license: l ? l.license : '',
    specialty: spec || ''
  };
}
function fmtPhone(ph) { ph = String(ph || ''); return ph.length === 10 ? '(' + ph.slice(0, 3) + ') ' + ph.slice(3, 6) + '-' + ph.slice(6) : ph; }

/* ---------- Search Provider modal ---------- */
var CSS = ''
  + '.pds-back{position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;font-family:inherit}'
  + '.pds{background:#fff;border-radius:14px;width:min(720px,100%);max-height:88vh;display:flex;flex-direction:column;box-shadow:0 24px 70px rgba(15,23,42,.35);overflow:hidden;color:#1f2937}'
  + '.pds-hd{background:#4f46e5;color:#fff;display:flex;align-items:center;gap:10px;padding:15px 18px;font-weight:700;font-size:15px}'
  + '.pds-hd .x{margin-left:auto;background:none;border:none;color:#c7d2fe;font-size:18px;cursor:pointer}'
  + '.pds-f{padding:14px 18px 12px;border-bottom:1px solid #eef0f3;background:#fafbfc}'
  + '.pds-f input,.pds-f select{border:1px solid #e5e7eb;border-radius:8px;padding:9px 11px;font-size:13px;font-family:inherit;color:#1f2937;background:#fff;box-sizing:border-box}'
  + '.pds-q{width:100%;margin-bottom:9px}'
  + '.pds-row{display:grid;grid-template-columns:1.5fr .8fr auto;gap:9px;align-items:center}'
  + '.pds-chk{display:flex;align-items:center;gap:6px;font-size:12.5px;color:#374151;cursor:pointer;white-space:nowrap}'
  + '.pds-list{overflow:auto;padding:12px 18px 16px;display:flex;flex-direction:column;gap:9px;min-height:120px}'
  + '.pds-count{font-size:11.5px;color:#6b7280}'
  + '.pds-card{border:1px solid #e5e7eb;border-radius:10px;padding:11px 13px;display:flex;gap:12px;align-items:flex-start}'
  + '.pds-card:hover{border-color:#c7d2fe}'
  + '.pds-card .nm{font-weight:700;font-size:13.5px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}'
  + '.pds-b{font-size:10px;font-weight:700;padding:1px 6px;border-radius:5px;border:1px solid;letter-spacing:.02em}'
  + '.pds-b.par{color:#15803d;border-color:#86efac;background:#f0fdf4}.pds-b.non{color:#b45309;border-color:#fcd34d;background:#fffbeb}'
  + '.pds-b.tier{color:#6d28d9;border-color:#c4b5fd;background:#f5f3ff}.pds-b.lic{color:#15803d;border-color:#86efac;background:#fff}'
  + '.pds-card .ln{font-size:12px;color:#4b5563;margin-top:4px}'
  + '.pds-card .ids{font-size:11.5px;color:#6b7280;margin-top:6px;display:flex;flex-wrap:wrap;gap:4px 12px}'
  + '.pds-card .ids b{color:#374151;font-weight:600}'
  + '.pds-locs{margin-top:8px;border-top:1px solid #eef0f3}'
  + '.pds-loc{display:flex;gap:12px;align-items:flex-start;padding:8px 0 8px 14px;border-bottom:1px dashed #eef0f3;border-left:3px solid #e0e7ff;margin-top:6px}'
  + '.pds-loc:last-child{border-bottom:none}'
  + '.pds-loc:hover{background:#f5f7ff}'
  + '.pds-loc .lnm{font-weight:600;font-size:12.5px;display:flex;flex-wrap:wrap;gap:6px;align-items:center}'
  + '.pds-loc .ln{margin-top:3px}'
  + '.pds-hid{font-size:11px;color:#9ca3af;font-style:italic;margin-top:4px;padding-left:14px}'
  + '.pds-sel{margin-left:auto;background:#6366f1;color:#fff;border:none;border-radius:7px;padding:7px 14px;font-weight:700;font-size:12.5px;cursor:pointer;white-space:nowrap;font-family:inherit}'
  + '.pds-sel:hover{background:#4f46e5}'
  + '.pds-empty{text-align:center;color:#9ca3af;font-size:13px;padding:26px 0}';
function ensureCss() {
  if (document.getElementById('pds-css')) return;
  var st = document.createElement('style'); st.id = 'pds-css'; st.textContent = CSS; document.head.appendChild(st);
}
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

var cur = null; // { opts, back }
// opts: { title, kinds:[...], query, onSelect(detail) }
function open(opts) {
  ensureCss(); close();
  var kinds = opts.kinds || ['prov', 'fac', 'dent', 'dgrp'];
  var pool = PROVIDER_DIR.filter(function (p) { return kinds.indexOf(p.kind) >= 0; });
  var specs = [];
  pool.forEach(function (p) { p.specialties.forEach(function (s) { if (specs.indexOf(s) < 0) specs.push(s); }); });
  specs.sort();
  var back = document.createElement('div'); back.className = 'pds-back';
  back.innerHTML = '<div class="pds" role="dialog" aria-label="' + esc(opts.title || 'Search Provider') + '">'
    + '<div class="pds-hd"><span>&#128269;</span><span>' + esc(opts.title || 'Search Provider') + '</span><button class="x" type="button" aria-label="Close">&#10005;</button></div>'
    + '<div class="pds-f"><input class="pds-q" placeholder="Search by name, NPI, specialty, Provider #, Tax ID, Network ID, Group # or Policy #..." value="' + esc(opts.query || '') + '">'
    + '<div class="pds-row"><select class="pds-spec"><option value="">All Specialties</option>' + specs.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('') + '</select>'
    + '<input class="pds-zip" placeholder="&#128205; Zip code" maxlength="5">'
    + '<label class="pds-chk"><input type="checkbox" class="pds-inn"> In-Network Only</label></div></div>'
    + '<div class="pds-list"></div></div>';
  document.body.appendChild(back);
  cur = { opts: opts, back: back, pool: pool };
  back.addEventListener('mousedown', function (e) { if (e.target === back) close(); });
  back.querySelector('.x').onclick = close;
  ['.pds-q', '.pds-zip'].forEach(function (s) { back.querySelector(s).addEventListener('input', render); });
  ['.pds-spec', '.pds-inn'].forEach(function (s) { back.querySelector(s).addEventListener('change', render); });
  document.addEventListener('keydown', onKey);
  render();
  var q = back.querySelector('.pds-q'); q.focus(); q.select();
}
function onKey(e) { if (e.key === 'Escape') close(); }
function close() {
  if (!cur) return;
  cur.back.remove(); cur = null; document.removeEventListener('keydown', onKey);
}
// One card per provider, with its locations listed underneath. Each location row has its own Select,
// because the location is what sets network status, TIN, Provider #, Network ID and the specialties
// credentialed there. Filters apply per location; a provider shows if any of its locations match.
function render() {
  if (!cur) return;
  var b = cur.back, q = b.querySelector('.pds-q').value.trim().toLowerCase(), spec = b.querySelector('.pds-spec').value,
    zip = b.querySelector('.pds-zip').value.trim(), inn = b.querySelector('.pds-inn').checked;
  var groups = [], picks = [];
  cur.pool.forEach(function (p) {
    // Provider-level text (name, NPI, group) matching means every location of that provider qualifies.
    var provHit = !q || [p.name, p.npi, p.groupNum, p.groupName].concat(p.specialties).join(' ').toLowerCase().indexOf(q) >= 0;
    var locs = p.locations.filter(function (l) {
      var specsHere = pdSpecsAt(p, l);
      if (spec && specsHere.indexOf(spec) < 0) return false;
      if (inn && l.net !== 'In-Network') return false;
      if (zip && l.zip.indexOf(zip) !== 0) return false;
      if (q && !provHit) {
        var hay = [l.name, l.addr, l.provNum, l.tin, l.networkId, l.state].concat(specsHere, l.policyNums).join(' ').toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    if (locs.length) groups.push({ p: p, locs: locs });
  });
  var list = b.querySelector('.pds-list');
  var nLocs = groups.reduce(function (n, g) { return n + g.locs.length; }, 0);
  list.innerHTML = groups.length
    ? '<div class="pds-count">' + groups.length + ' provider' + (groups.length === 1 ? '' : 's') + ' &middot; ' + nLocs + ' location' + (nLocs === 1 ? '' : 's') + '</div>' + groups.map(function (g) {
      var p = g.p;
      var locHtml = g.locs.map(function (l) {
        var i = picks.push({ p: p, l: l, specs: pdSpecsAt(p, l) }) - 1, par = l.net === 'In-Network';
        return '<div class="pds-loc"><div style="flex:1;min-width:0">'
          + '<div class="lnm">&#128205; ' + esc(l.name)
          +   '<span class="pds-b ' + (par ? 'par' : 'non') + '">' + (par ? 'PAR' : 'NON-PAR') + '</span>'
          +   (l.tier ? '<span class="pds-b tier">Tier ' + l.tier + '</span>' : '') + '</div>'
          + '<div class="ln">' + esc(l.addr) + ' &nbsp;&middot;&nbsp; &#128222; ' + esc(fmtPhone(l.phone)) + (l.specs ? ' &nbsp;&middot;&nbsp; ' + esc(l.specs.join(', ')) : '') + '</div>'
          + '<div class="ids"><span><b>Provider #</b> ' + esc(l.provNum) + '</span><span><b>State</b> ' + esc(l.state) + '</span><span><b>Tax ID</b> ' + esc(l.tin) + '</span>'
          +   '<span><b>Network ID</b> ' + esc(l.networkId || 'None (OON)') + '</span><span><b>Policy #s</b> ' + esc(l.policyNums.join(', ') || 'None') + '</span></div>'
          + '</div><button type="button" class="pds-sel" data-i="' + i + '">&#10003; Select</button></div>';
      }).join('');
      var hidden = p.locations.length - g.locs.length;
      return '<div class="pds-card"><div style="flex:1;min-width:0">'
        + '<div class="nm">' + esc(p.name) + (p.cred ? ', ' + esc(p.cred) : '')
        +   '<span class="pds-b lic">LICENSE: ' + esc(p.locations[0].license).toUpperCase() + '</span></div>'
        + '<div class="ln">&#127973; ' + esc(p.specialties.join(', ')) + ' &nbsp;&middot;&nbsp; NPI: ' + esc(p.npi) + ' &nbsp;&middot;&nbsp; Group #: ' + esc(p.groupNum) + '</div>'
        + '<div class="pds-locs">' + locHtml + '</div>'
        + (hidden ? '<div class="pds-hid">+' + hidden + ' other location' + (hidden === 1 ? '' : 's') + ' hidden by filters</div>' : '')
        + '</div></div>';
    }).join('')
    : '<div class="pds-empty">No providers match these filters.</div>';
  list.querySelectorAll('.pds-sel').forEach(function (btn) {
    btn.onclick = function () {
      var r = picks[+btn.getAttribute('data-i')];
      var chosen = spec && r.specs.indexOf(spec) >= 0 ? spec : (r.specs.length === 1 ? r.specs[0] : '');
      var fn = cur.opts.onSelect; close();
      if (fn) fn(pdDetail(r.p, r.l, chosen));
    };
  });
}

window.PROVIDER_DIR = PROVIDER_DIR;
window.pdFind = pdFind; window.pdLoc = pdLoc; window.pdSpecsAt = pdSpecsAt; window.pdDetail = pdDetail;
window.pdFindByName = pdFindByName; window.pdFmtPhone = fmtPhone;
window.ProviderSearch = { open: open, close: close };
})();
