import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { ReferralStatus, TriagePriority } from '../types';
import {
  ShieldCheck,
  TrendingUp,
  Activity,
  Users,
  Building2,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Download,
  Layers,
  Hospital
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    patients,
    referrals,
    followUps,
    facilities,
    auditLogs,
    encounters,
    t
  } = useHealth();

  const [referralStatusFilter, setReferralStatusFilter] = useState<string>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [searchTableQuery, setSearchTableQuery] = useState<string>('');
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'referrals' | 'facilities' | 'audit'>('overview');

  // KPI Calculations
  const totalPatients = patients.length;
  const totalReferrals = referrals.length;
  const completedReferrals = referrals.filter(r => r.status === 'Completed').length;
  const referralCompletionRate = totalReferrals > 0 ? Math.round((completedReferrals / totalReferrals) * 100) : 100;

  const totalFollowUps = followUps.length;
  const completedFollowUps = followUps.filter(f => f.status === 'completed').length;
  const followUpComplianceRate = totalFollowUps > 0 ? Math.round((completedFollowUps / totalFollowUps) * 100) : 100;

  const highRiskEncounters = encounters.filter(e => e.triagePriority === 'emergency' || e.triagePriority === 'high').length;

  // Filtered referrals for master tracking table
  const filteredReferrals = referrals.filter(r => {
    const matchesStatus = referralStatusFilter === 'all' || r.status === referralStatusFilter;
    const matchesUrgency = urgencyFilter === 'all' || r.urgency === urgencyFilter;
    const matchesSearch =
      r.patientName.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.toFacility.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
      r.fromFacility.toLowerCase().includes(searchTableQuery.toLowerCase());
    return matchesStatus && matchesUrgency && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center font-bold text-xl shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                District Health Officer &bull; Nashik Health Command
              </h2>
              <span className="bg-slate-900 text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Public Health Oversight
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Coverage: <strong>Chandur &amp; Igatpuri Sub-Divisions &bull; 4 Connected Health Tiers</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ patients, referrals, followUps, auditLogs }, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `sanjeevani_report_${new Date().toISOString().split('T')[0]}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export District Report</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>{t.adminPortal.referralCompletionRate}</span>
            <TrendingUp className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {referralCompletionRate}%
          </div>
          <div className="text-[11px] text-teal-700 font-semibold mt-1">
            {completedReferrals} of {totalReferrals} referrals resolved
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>{t.adminPortal.followUpCompliance}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {followUpComplianceRate}%
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            {completedFollowUps} of {totalFollowUps} home visits completed
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>{t.adminPortal.highRiskCases}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-950 mt-1">
            {highRiskEncounters}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold mt-1">
            Immediate attention / Red-flagged
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>Registered Citizens</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {totalPatients}
          </div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">
            100% ABHA Linked Records
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-xs">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeAdminTab === 'overview' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Patient Flow &amp; Facility Network
        </button>

        <button
          onClick={() => setActiveAdminTab('referrals')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeAdminTab === 'referrals' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Referral Tracking Master Table ({referrals.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('facilities')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeAdminTab === 'facilities' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Facility Directory ({facilities.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeAdminTab === 'audit' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          Live Traceability Audit Log ({auditLogs.length})
        </button>
      </div>

      {/* Tab 1: Overview & Patient Flow Pipeline Chart */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Visual Patient Flow across 4 Tiers */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                End-to-End Continuity of Care Pipeline (Tier Flow)
              </h3>
              <p className="text-xs text-slate-600">
                Tracking patient mobility from village doorstep through tertiary specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-teal-950">
                  <span>Tier 1: Sub-centre</span>
                  <span className="bg-teal-200 text-teal-900 px-2 py-0.5 rounded">ASHA / ANM</span>
                </div>
                <div className="text-2xl font-extrabold text-teal-950">{encounters.length}</div>
                <div className="text-[11px] text-teal-800">
                  Field Vitals &amp; Risk Screenings Recorded
                </div>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-950">
                  <span>Tier 2: Primary (PHC)</span>
                  <span className="bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded">MO &amp; CHO</span>
                </div>
                <div className="text-2xl font-extrabold text-indigo-950">
                  {referrals.filter(r => r.toFacilityType === 'PHC').length}
                </div>
                <div className="text-[11px] text-indigo-800">
                  Teleconsults &amp; Clinical Triage Encounters
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-950">
                  <span>Tier 3: CHC / Rural</span>
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded">Specialist</span>
                </div>
                <div className="text-2xl font-extrabold text-amber-950">
                  {referrals.filter(r => r.toFacilityType === 'Rural Hospital').length}
                </div>
                <div className="text-[11px] text-amber-800">
                  Secondary Diagnostics &amp; Inpatient Care
                </div>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                  <span>Tier 4: District Hospital</span>
                  <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Civil Hospital</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-950">
                  {referrals.filter(r => r.toFacilityType === 'District Hospital').length}
                </div>
                <div className="text-[11px] text-emerald-800">
                  Critical Escalations &amp; Tertiary Care
                </div>
              </div>
            </div>
          </div>

          {/* Referral Status Breakdown & High-Risk Case Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Referral Resolution Funnel</h4>
              <div className="space-y-2">
                {['Created', 'Accepted', 'In Progress', 'Completed'].map(status => {
                  const count = referrals.filter(r => r.status === status).length;
                  const pct = totalReferrals > 0 ? Math.round((count / totalReferrals) * 100) : 0;
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{status}</span>
                        <span>{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            status === 'Completed' ? 'bg-emerald-600' :
                            status === 'In Progress' ? 'bg-indigo-600' :
                            status === 'Accepted' ? 'bg-teal-600' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Triage Urgency Distribution</h4>
              <div className="space-y-2">
                {[
                  { label: 'Emergency', count: encounters.filter(e => e.triagePriority === 'emergency').length, color: 'bg-rose-600' },
                  { label: 'High Priority', count: encounters.filter(e => e.triagePriority === 'high').length, color: 'bg-amber-500' },
                  { label: 'Moderate', count: encounters.filter(e => e.triagePriority === 'medium').length, color: 'bg-yellow-500' },
                  { label: 'Routine', count: encounters.filter(e => e.triagePriority === 'low').length, color: 'bg-emerald-600' }
                ].map(item => {
                  const pct = encounters.length > 0 ? Math.round((item.count / encounters.length) * 100) : 0;
                  return (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span>{item.count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${Math.max(pct, 5)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Referral Tracking Table with Filters */}
      {activeAdminTab === 'referrals' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Master Referral Tracking Table
              </h3>
              <p className="text-xs text-slate-500">
                Live status of all inter-facility patient transfers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={referralStatusFilter}
                onChange={e => setReferralStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="all">All Statuses</option>
                <option value="Created">Created</option>
                <option value="Accepted">Accepted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={urgencyFilter}
                onChange={e => setUrgencyFilter(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="all">All Urgency</option>
                <option value="emergency">Emergency</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTableQuery}
                  onChange={e => setSearchTableQuery(e.target.value)}
                  placeholder="Search table..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Ref ID</th>
                  <th className="py-2.5 px-3">Patient</th>
                  <th className="py-2.5 px-3">From Facility</th>
                  <th className="py-2.5 px-3">To Facility</th>
                  <th className="py-2.5 px-3">Urgency</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Created</th>
                  <th className="py-2.5 px-3">Referred By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReferrals.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800">#{r.id}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {r.patientName}
                      <span className="text-[10px] text-slate-500 block font-normal">{r.patientVillage}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{r.fromFacility}</td>
                    <td className="py-2.5 px-3 font-semibold text-teal-900">{r.toFacility}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        r.urgency === 'emergency' ? 'bg-rose-100 text-rose-800' :
                        r.urgency === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {r.urgency}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        r.status === 'Accepted' ? 'bg-teal-100 text-teal-800' :
                        r.status === 'In Progress' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500">{r.createdAt}</td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">{r.referredByName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Connected Facility Directory */}
      {activeAdminTab === 'facilities' && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Connected Healthcare Facility Grid
            </h3>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              4 Live Nodes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map(fac => (
              <div key={fac.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-teal-100 text-teal-900 px-2 py-0.5 rounded">
                    {fac.type}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Teleconsult Active</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{fac.name}</h4>
                <div className="text-xs text-slate-600">
                  Block: <strong>{fac.block}</strong> &bull; District: <strong>{fac.district}</strong>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs flex justify-between text-slate-700">
                  <span>Contact: {fac.contactPerson}</span>
                  <span className="font-semibold">{fac.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Live System Audit & Traceability Log */}
      {activeAdminTab === 'audit' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                System Audit Trail &amp; Data Provenance
              </h3>
              <p className="text-xs text-slate-500">
                Immutable chronological log of all registrations, vitals entries, referrals, and follow-ups.
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
              {auditLogs.length} Entries
            </span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {auditLogs.map(log => (
              <div key={log.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                      {log.action}
                    </span>
                    <span className="font-semibold text-teal-800">
                      {log.actorName} ({log.actorRole.toUpperCase()})
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono">{log.timestamp}</span>
                </div>

                <p className="text-slate-700 font-medium">
                  {log.details}
                </p>

                <div className="text-[10px] text-slate-500 pt-1 flex items-center justify-between">
                  <span>Facility: <strong>{log.facility}</strong></span>
                  {log.patientName && <span>Patient: <strong>{log.patientName}</strong></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
