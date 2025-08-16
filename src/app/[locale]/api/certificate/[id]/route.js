import puppeteer from "puppeteer";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 900,
      deviceScaleFactor: 2,
    });

    await page.goto(`${process.env.NEXT_PUBLIC_DOMAIN}/en/certificate/${id}/preview`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    await page.waitForSelector(".certificateContainer", { timeout: 10000 });

    const element = await page.$(".certificateContainer");

    let screenshot;
    if (element) {
      screenshot = await element.screenshot({
        type: "png",
        omitBackground: false,
      });
    } else {
      const fallbackElement = await page.$(".certificatePage");
      if (fallbackElement) {
        screenshot = await fallbackElement.screenshot({
          type: "png",
          omitBackground: false,
        });
      } else {
        throw new Error("Certificate element not found");
      }
    }

    await browser.close();

    return new Response(screenshot, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return new Response("Certificate image generation failed", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
