//поганий приклад
function calculateDiscount(price: number, discount: number): number {
    if (discount > 50) {
        discount = 50; // присвоєння параметру
    }
    return price - (price * (discount / 100));
}

//виправлений приклад
function calculateDiscount(price: number, discount: number): number {
    let adjustedDiscount = discount; // створення локальної змінної
    if (adjustedDiscount > 50) {
        adjustedDiscount = 50;
    }
    return price - (price * (adjustedDiscount / 100));
}


//поганий приклад
function processOrder(order: Order): void {
    if (order.status === "new") {
        sendNotification(order);
        console.log("Order processed.");
    } else if (order.status === "pending") {
        sendNotification(order);
        console.log("Order processed.");
    }
}

//виправлений приклад
function processOrder(order: Order): void {
    if (order.status === "new" || order.status === "pending") {
        sendNotification(order);
        console.log("Order processed.");
    }
}


//поганий приклад
function analyzeData(data: number[]): { total: number; average: number } {
    let total = 0;
    for (const value of data) {
        total += value;
    }
    const average = total / data.length;
    return { total, average };
}

//виправлений приклад
class DataAnalyzer {
    data: number[];

    constructor(data: number[]) {
        this.data = data;
    }

    analyze(): { total: number; average: number } {
        const total = this.data.reduce((sum, value) => sum + value, 0);
        const average = total / this.data.length;
        return { total, average };
    }
}
// Використання:
const analyzer = new DataAnalyzer([10, 20, 30]);
console.log(analyzer.analyze());
