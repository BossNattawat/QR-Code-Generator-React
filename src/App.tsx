import QRcode from "qrcode"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

function App() {

  const [url, setUrl] = useState<string>("");
  const [qrcode, setQrcode] = useState<string>("");
  const [showQRcode, setShowQRcode] = useState<boolean>(false);
  const [fgColor, setFgColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#ffffff");


  function GenerateQRCode() {
    QRcode.toDataURL(url, { 
      color: {
        dark: fgColor,
        light: bgColor
      },
      version: 7 
    }, (err, url) => {

      if(err) {
        toast.error(err.message)
        return
      }

      if(url.trim() === "") {
        return
      }

      setQrcode(url)
      setShowQRcode(true)
    })
  }

  function resetColor() {
    setFgColor("#000000")
    setBgColor("#ffffff")
  }

  useEffect(() => {
    if(url.trim() !== "") {
      GenerateQRCode()
    }
  }, [bgColor, fgColor])

  return (
    <div className="min-h-screen w-full p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col p-5 justify-center items-center gap-y-5 w-full">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <input type="text" className="input w-full" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="e.g. https://www.google.com" />
        <button className="btn btn-success w-full" onClick={GenerateQRCode} disabled={url.trim() === ""}>Generate</button>
      </div>

      {showQRcode && (
        <div className="flex flex-col p-5 ">
          <img src={qrcode} alt="qrcode" style={{ width: 200 }} />
          <a href={qrcode} className="btn btn-info w-full mt-5" download="qrcode.png">Download</a>
        </div>
      )}

      {showQRcode && (
        <div className="flex flex-col p-5 xl:w-md w-sm">
          <div className="flex flex-col gap-4 c">
              <div className="flex gap-4 w-full">
                <label className="label flex flex-col w-full">Foreground: <input type="color" className="input" value={fgColor} onChange={(e) => setFgColor(e.target.value)} /></label>
                <label className="label flex flex-col w-full">Background: <input type="color" className="input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></label>
              </div>
              <button className="btn btn-error w-full" onClick={resetColor}>Reset</button>
          </div>

        </div>
      )}
    </div>
  )
}

export default App