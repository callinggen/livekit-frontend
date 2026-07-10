import React, { useState, useMemo } from "react";
import { Filter, Download, AlertCircle, PhoneOff } from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import SortArrow, { SortDirection } from "./SortArrow";
import SearchInput from "./SearchInput";
import PaginationControls from "./PaginationControls";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchableKeys?: string[]; // Keys to search across
  filters?: FilterOption[];  // Custom dropdown filters
  exportFileName?: string;
  onRowClick?: (item: T) => void;
  enableMultiSelect?: boolean;
  multiSelectActions?: (selectedItems: T[], clearSelection: () => void) => React.ReactNode;
  emptyStateMessage?: string;
  emptyStateSubMessage?: string;
  emptyStateIcon?: React.ReactNode;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  searchableKeys = [],
  filters = [],
  exportFileName = "export.xlsx",
  onRowClick,
  enableMultiSelect = false,
  multiSelectActions,
  emptyStateMessage = "No records found",
  emptyStateSubMessage = "Try adjusting your filters or search query.",
  emptyStateIcon = <PhoneOff className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: SortDirection }>({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  // Handle Search and Filter
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchQuery && searchableKeys.length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(item => {
        return searchableKeys.some(key => {
          const val = (item as any)[key];
          return val && String(val).toLowerCase().includes(q);
        });
      });
    }

    // Dropdown Filters
    Object.keys(filterValues).forEach(filterKey => {
      const filterValue = filterValues[filterKey];
      if (filterValue && filterValue !== "All") {
        result = result.filter(item => String((item as any)[filterKey]) === String(filterValue));
      }
    });

    return result;
  }, [data, searchQuery, filterValues, searchableKeys]);

  // Handle Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = (a as any)[sortConfig.key!];
      const bVal = (b as any)[sortConfig.key!];
      
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const cycleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const handleExport = () => {
    if (sortedData.length === 0) return;
    
    // We only export what we have displayed, formatted nicely
    const exportData = sortedData.map(item => {
      const exportRow: any = {};
      columns.forEach(col => {
        if (col.key !== "actions" && col.key !== "checkbox") {
          exportRow[col.label] = (item as any)[col.key] || "";
        }
      });
      return exportRow;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, "Export");
    XLSX.writeFile(wb, exportFileName);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedData.map(item => item.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) newSelected.add(id);
    else newSelected.delete(id);
    setSelectedIds(newSelected);
  };

  const clearSelection = () => setSelectedIds(new Set());
  const selectedItems = sortedData.filter(item => selectedIds.has(item.id));

  return (
    <div className="flex flex-col h-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-[#0B0F19] relative">
      
      {/* Sticky Action Bar for Multi-Select */}
      {enableMultiSelect && selectedIds.size > 0 && multiSelectActions && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between rounded-t-2xl border-b border-indigo-200 bg-indigo-50 px-6 py-4 dark:border-indigo-900/50 dark:bg-indigo-900/20">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300">
              {selectedIds.size} {selectedIds.size === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            {multiSelectActions(selectedItems, clearSelection)}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className={`flex flex-col gap-4 border-b border-zinc-100 p-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between shrink-0 ${selectedIds.size > 0 ? 'opacity-0 pointer-events-none' : ''}`}>
        
        {/* Search */}
        {searchableKeys.length > 0 && (
          <SearchInput 
            value={searchQuery} 
            onChange={(val) => { setSearchQuery(val); setCurrentPage(1); }} 
          />
        )}

        {/* Filters and Export */}
        <div className="flex flex-wrap items-center gap-3">
          {filters.map(filter => (
            <div key={filter.key} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-700/50 dark:bg-zinc-900/50">
              <Filter className="h-4 w-4 text-zinc-400" />
              <select 
                value={filterValues[filter.key] || "All"} 
                onChange={(e) => { 
                  setFilterValues(prev => ({ ...prev, [filter.key]: e.target.value })); 
                  setCurrentPage(1); 
                }}
                className="bg-transparent text-sm font-medium text-zinc-700 focus:outline-none dark:text-zinc-300 max-w-[120px] truncate"
              >
                <option value="All">All {filter.label}</option>
                {filter.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          ))}

          <Button 
            variant="outline"
            className="rounded-xl px-4 py-2 font-semibold shadow-sm"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        {paginatedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-900">
              {emptyStateIcon}
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{emptyStateMessage}</h3>
            <p className="mt-1 text-sm text-zinc-500">{emptyStateSubMessage}</p>
            <Button 
              variant="outline"
              className="mt-6 rounded-lg"
              onClick={() => { setSearchQuery(""); setFilterValues({}); }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="sticky top-0 z-10 border-b border-zinc-100 bg-zinc-50 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-[#121622] shadow-sm">
              <tr>
                {enableMultiSelect && (
                  <th className="px-6 py-4 w-12">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                      checked={paginatedData.length > 0 && paginatedData.every(item => selectedIds.has(item.id))}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map(col => (
                  <th 
                    key={col.key} 
                    className={`group px-6 py-4 ${col.sortable ? 'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50' : ''}`}
                    onClick={() => col.sortable && cycleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && (
                        <SortArrow direction={sortConfig.key === col.key ? sortConfig.direction : null} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 bg-white dark:bg-[#0B0F19]">
              {paginatedData.map(item => (
                <tr 
                  key={item.id} 
                  className={`group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${onRowClick ? 'cursor-pointer' : ''} ${selectedIds.has(item.id) ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {enableMultiSelect && (
                    <td className="px-6 py-4 w-12" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                        checked={selectedIds.has(item.id)}
                        onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && (
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={sortedData.length}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
