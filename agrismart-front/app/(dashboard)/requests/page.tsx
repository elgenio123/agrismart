"use client";

import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageTransition, AnimateIn } from "@/components/ui/motion";
import { scanRequests as initialRequests } from "@/lib/mock-data";
import { formatCurrency, getStatusLabel, getStatusColor, approveRequest, rejectRequest } from "@/lib/services";
import { LocationMap } from "@/components/ui/location-map";
import type { ScanRequest, RequestStatus } from "@/lib/types";
import {
  Search,
  Filter,
  MapPin,
  Banana,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Calendar,
  ArrowUpDown,
  CreditCard,
  Eye,
} from "lucide-react";

const statusFilters: { label: string; value: RequestStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending_approval" },
  { label: "Approved", value: "approved" },
  { label: "Scheduled", value: "scheduled" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

export default function RequestsPage() {
  const [requests, setRequests] = useState<ScanRequest[]>(initialRequests);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ScanRequest | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        r.farmerName.toLowerCase().includes(q) ||
        r.farmName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.cropType.toLowerCase().includes(q) ||
        r.location.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApprove = useCallback(async (req: ScanRequest) => {
    setActionLoading(req.id);
    const updated = await approveRequest(req);
    setRequests((prev) => prev.map((r) => (r.id === req.id ? updated : r)));
    if (selectedRequest?.id === req.id) setSelectedRequest(updated);
    setActionLoading(null);
  }, [selectedRequest]);

  const handleReject = useCallback(async (req: ScanRequest) => {
    setActionLoading(req.id);
    const updated = await rejectRequest(req);
    setRequests((prev) => prev.map((r) => (r.id === req.id ? updated : r)));
    if (selectedRequest?.id === req.id) setSelectedRequest(updated);
    setActionLoading(null);
  }, [selectedRequest]);

  return (
    <PageTransition>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Scan Requests</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {requests.length} total · {requests.filter((r) => r.status === "pending_approval").length} awaiting action
          </p>
        </div>
      </div>

      {/* Filters */}
      <AnimateIn>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Input
              icon="search"
              placeholder="Search by farmer, farm, crop, region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === f.value
                    ? "bg-primary-500 text-white shadow-sm"
                    : "bg-white border border-border text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </AnimateIn>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Request List */}
        <AnimateIn className="lg:col-span-3">
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary/50">
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted">Request</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted hidden sm:table-cell">Crop</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted hidden md:table-cell">Region</th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-text-muted">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted hidden sm:table-cell">Amount</th>
                    <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((req) => (
                    <tr
                      key={req.id}
                      onClick={() => setSelectedRequest(req)}
                      className={`border-b border-border-light last:border-0 hover:bg-primary-50/30 transition-colors cursor-pointer ${
                        selectedRequest?.id === req.id ? "bg-primary-50/50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-text-primary">{req.farmerName}</p>
                          <p className="text-xs text-text-muted mt-0.5">{req.id} · {req.hectares}ha</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">{req.cropType}</td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell">{req.location.region}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={getStatusColor(req.status)} size="sm" dot>
                          {getStatusLabel(req.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums hidden sm:table-cell">
                        {formatCurrency(req.paymentAmount)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {req.status === "pending_approval" ? (
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              size="sm"
                              variant="primary"
                              loading={actionLoading === req.id}
                              onClick={(e) => { e.stopPropagation(); handleApprove(req); }}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              loading={actionLoading === req.id}
                              onClick={(e) => { e.stopPropagation(); handleReject(req); }}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedRequest(req); }}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-muted">
                        No requests match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </AnimateIn>

        {/* Detail Panel */}
        <AnimateIn delay={0.1} className="lg:col-span-2">
          {selectedRequest ? (
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-text-primary">{selectedRequest.id}</h3>
                <Badge variant={getStatusColor(selectedRequest.status)} size="md" dot>
                  {getStatusLabel(selectedRequest.status)}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Farmer Info */}
                <div className="rounded-lg bg-surface-secondary p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Farmer Details</p>
                  <p className="text-sm font-semibold text-text-primary">{selectedRequest.farmerName}</p>
                  <p className="text-xs text-text-muted mt-1">{selectedRequest.farmerPhone}</p>
                  <p className="text-xs text-text-muted">{selectedRequest.farmName}</p>
                </div>

                {/* Location */}
                <div className="rounded-lg bg-surface-secondary p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Location</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-text-primary">{selectedRequest.location.address}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {selectedRequest.location.coordinates.lat.toFixed(4)}, {selectedRequest.location.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  {/* Google Map */}
                  <LocationMap
                    lat={selectedRequest.location.coordinates.lat}
                    lng={selectedRequest.location.coordinates.lng}
                    markerLabel={selectedRequest.farmName}
                    className="mt-3 h-40 w-full rounded-lg overflow-hidden"
                  />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border-light p-3">
                    <p className="text-xs text-text-muted">Hectares</p>
                    <p className="text-lg font-extrabold text-text-primary tabular-nums">{selectedRequest.hectares}ha</p>
                  </div>
                  <div className="rounded-lg border border-border-light p-3">
                    <div className="flex items-center gap-1">
                      <Banana className="h-3 w-3 text-text-muted" />
                      <p className="text-xs text-text-muted">Crop</p>
                    </div>
                    <p className="text-lg font-extrabold text-text-primary">{selectedRequest.cropType}</p>
                  </div>
                  <div className="rounded-lg border border-border-light p-3">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3 text-text-muted" />
                      <p className="text-xs text-text-muted">Payment</p>
                    </div>
                    <p className="text-sm font-bold text-text-primary">{formatCurrency(selectedRequest.paymentAmount)}</p>
                    <Badge variant={selectedRequest.paymentStatus === "paid" ? "success" : "warning"} size="sm" className="mt-1">
                      {selectedRequest.paymentStatus}
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-border-light p-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-text-muted" />
                      <p className="text-xs text-text-muted">Requested</p>
                    </div>
                    <p className="text-sm font-bold text-text-primary">{selectedRequest.requestDate}</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedRequest.notes && (
                  <div className="rounded-lg border border-border-light p-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1">Notes</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{selectedRequest.notes}</p>
                  </div>
                )}

                {/* Actions */}
                {selectedRequest.status === "pending_approval" && (
                  <div className="flex gap-3 pt-2">
                    <Button
                      className="flex-1"
                      loading={actionLoading === selectedRequest.id}
                      onClick={() => handleApprove(selectedRequest)}
                    >
                      <CheckCircle2 className="h-4 w-4" /> Approve Request
                    </Button>
                    <Button
                      variant="danger"
                      loading={actionLoading === selectedRequest.id}
                      onClick={() => handleReject(selectedRequest)}
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                  </div>
                )}

                {selectedRequest.status === "approved" && (
                  <div className="pt-2">
                    <a href="/scheduling">
                      <Button className="w-full">
                        <Calendar className="h-4 w-4" /> Schedule Mission
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-12 w-12 rounded-xl bg-surface-secondary flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-text-muted" />
              </div>
              <p className="text-sm font-semibold text-text-primary">Select a request</p>
              <p className="text-xs text-text-muted mt-1">Click on any request to view details</p>
            </Card>
          )}
        </AnimateIn>
      </div>
    </PageTransition>
  );
}
