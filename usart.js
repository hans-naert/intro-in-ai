// USART/RS232 Serial Communication
class SerialComm {
    constructor() {
        this.port = null;
    }

    async connect() {
        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({ baudRate: 9600 });
            console.log("Serial port connected");
        } catch (error) {
            console.error("Failed to open serial port:", error);
        }
    }

    async send(message) {
        if (!this.port || !this.port.writable) {
            console.warn("Serial port not available");
            return;
        }
        try {
            const writer = this.port.writable.getWriter();
            await writer.write(new TextEncoder().encode(message + "\n"));
            writer.releaseLock();
            console.log("Sent:", message);
        } catch (error) {
            console.error("Failed to send data:", error);
        }
    }

    async disconnect() {
        if (this.port) {
            await this.port.close();
            this.port = null;
            console.log("Serial port disconnected");
        }
    }
}

// Expose a global `usart` instance for use in other scripts
window.usart = new SerialComm();
