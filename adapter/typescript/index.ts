class HDMI {
	public static PREFIX = '__HDMI{'
	public static SUFFIX = '}HDMI__'
	public render(message: string): string {
		if (message.startsWith(HDMI.PREFIX) && message.endsWith(HDMI.SUFFIX)) {
			return `${message}`
		}
		throw Error('Invalid data format for HDMI')
	}
}

class USBTypeC {
	public static PREFIX = '__USBTypeC{'
	public static SUFFIX = '}USBTypeC__'
	public render(message: string): string {
		if (message.startsWith(USBTypeC.PREFIX) && message.endsWith(USBTypeC.SUFFIX)) {
			return `${message}`
		}
		throw Error('Invalid data format for USB Type C')
	}
}

// let say you are now preparing for you presentation,
// but the available projector in your class only accepts HDMI as the input source,
// but your MacBook Pro 13" 2020 Touch Bar M1 256GB have no HDMI port at all,
// so you go to Amazone and buy an adapter to convert USB Type C to HDMI.
// this class is about to convert output data from HDMI to USB type c.
class HdmiToUsbTypeCAdapter {
	protected hdmi: HDMI
	constructor(hdmi: HDMI) {
		this.hdmi = hdmi
	}

	render(message: string): string {
		try {
			const hdmiData = this.hdmi.render(message)
			let tmp = hdmiData.substring(HDMI.PREFIX.length)
			tmp = tmp.substr(0, tmp.length - HDMI.PREFIX.length)
			const usbTypeCData = `${USBTypeC.PREFIX}${tmp}${USBTypeC.SUFFIX}`
			return usbTypeCData
		} catch (error) {
			throw error	
		}
	}
}

const hdmiOutput = new HDMI()

const hdmiToUsbTypeCAdapter = new HdmiToUsbTypeCAdapter(hdmiOutput)

const usbTypeCInput = new USBTypeC()

const originalMessage = `${HDMI.PREFIX}yea this is my message :D${HDMI.SUFFIX}`

const output = usbTypeCInput.render(hdmiToUsbTypeCAdapter.render(originalMessage))
console.log(output)
