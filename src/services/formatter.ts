export class Formatter {

    formatNumber(
        initialValue: string,
        length: number,
        groubLength: number,
        willHaveSpaces = true
    ) {

        const value = initialValue.replace(/[^\d]/g, '').substring(0, length);

        const groups: string[] = [];

        for (let i = 0; i < value.length; i += groubLength) {
            groups.push(value.substring(i, i + groubLength))
        }

        return groups.join(willHaveSpaces ? ' ' : '');
    }
}