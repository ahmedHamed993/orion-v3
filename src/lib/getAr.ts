const translations = {
  preparing: "قيد التحضير",
  delivering: "قيد التوصيل",
  completed: "مكتمل",
  declined: "مرفوض",
  cancelled: "ملغي",
};

export const getAr = (key: any) => {
  return translations?.hasOwnProperty(key)
    ? translations[key as keyof typeof translations]
    : key;
};
