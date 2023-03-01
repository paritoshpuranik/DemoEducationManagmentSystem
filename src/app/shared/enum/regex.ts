export class Regex {
    public static readonly regexPassword = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;  // Regex password(number, capital letter and all symbol).
    public static readonly regexEmail= /^[\w._-]+@\w+(\.\w+)+$/;
    public static readonly regexHiddenEmail = /(.{2})(.*)(?=@)/;
    public static readonly regexMobileNumber= /^[6-9][0-9]{0,9}$/;
    public static readonly regexAlphabets = /^[A-Za-z]+$/;
}