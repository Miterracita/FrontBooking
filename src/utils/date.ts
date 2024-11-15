export const formatDate = (dateString: any) => {
    return new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(dateString));
};
