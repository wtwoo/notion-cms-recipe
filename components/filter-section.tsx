"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  category: string;
  cookingTime: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onCookingTimeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

/**
 * 필터 섹션 컴포넌트
 * 카테고리, 조리시간, 검색 필터 제공
 */
export function FilterSection({
  category,
  cookingTime,
  search,
  onCategoryChange,
  onCookingTimeChange,
  onSearchChange,
  onReset,
}: FilterSectionProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">필터</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 px-2 lg:px-3"
        >
          <X className="mr-2 size-4" />
          초기화
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* 카테고리 필터 */}
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            카테고리
          </label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger id="category" aria-label="카테고리 선택">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="한식">한식</SelectItem>
              <SelectItem value="양식">양식</SelectItem>
              <SelectItem value="중식">중식</SelectItem>
              <SelectItem value="일식">일식</SelectItem>
              <SelectItem value="기타">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 조리시간 필터 */}
        <div className="space-y-2">
          <label
            htmlFor="cookingTime"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            조리시간
          </label>
          <Select value={cookingTime} onValueChange={onCookingTimeChange}>
            <SelectTrigger id="cookingTime" aria-label="조리시간 선택">
              <SelectValue placeholder="전체" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="10">10분 이내</SelectItem>
              <SelectItem value="20">20분 이내</SelectItem>
              <SelectItem value="30">30분 이내</SelectItem>
              <SelectItem value="60">60분 이내</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 검색 */}
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            검색
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="레시피 제목 검색"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
              aria-label="레시피 검색"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
