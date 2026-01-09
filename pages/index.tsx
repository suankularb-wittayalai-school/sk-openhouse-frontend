import cn from "@/utils/helpers/cn";
import Image from "next/image";
import QRCode from "react-qr-code";

const QRCODES = [
  "80110f41-4095-46b2-bec5-a5529d6f0490",
  "0912c475-ce05-48c3-b676-d0ff2e27f6c4",
  "8e89b905-613b-42a2-acb1-62323ff72b78",
  "370c6693-60ad-4948-8479-5acfa2231802",
  "91583293-bf9a-4de6-b003-21105a11c435",
  "f0bdcf7b-ecf1-4ffd-ac09-1dcec74bec5b",
  "33c84f4f-9b07-4b9a-9d8e-0a944a15848e",
  "93eff412-fd2b-4207-a115-90a09315c230",
  "00b93f60-82fb-478c-a61f-e6edd660b5a5",
  "2f110677-7102-4545-86b2-eeeece228d65",
  "34fbdd09-a43a-4fb3-9d1f-716fd5446176",
  "6f42160e-9505-49b8-879a-5c7376f59bf2",
  "64460da2-074e-4068-95c9-08362db22d13",
  "f9e33a47-363a-43e2-9b49-b10045416359",
  "78872dd5-d08e-4f74-9e46-95679fb26adc",
  "eb4897bc-86c6-444b-b6c2-b5d477d998b6",
  "76c9ab34-ac89-4a29-be1d-52d5d244ba22",
  "c3e6753f-cc63-4458-9dc9-2f7c4edf71ed",
  "0bf9c7b6-02a8-4537-b3f3-6d0b9d277fe4",
  "17d1620c-f5f3-4d3e-96c0-dddf7c21b260",
  "f9ca444a-a5ce-4a54-a290-72d1ab286823",
  "a22fc9c3-d2b6-448d-9b6b-435af572595c",
  "f4f44912-c721-456b-bbe7-c00f8bb3701b",
  "31e8ae64-ce40-4cee-8e4b-0d7ae1a3c56c",
  "cd9add88-6f70-4102-bb02-919b17e9e11f",
  "5debd58b-6dca-496d-86cf-8c39e562ba73",
  "a9347927-9eb6-4fc9-ba3d-cc6e985a4a72",
  "f21d908a-bf91-4313-98c5-b660b419c6d1",
  "98562fee-902b-4b30-baa4-61d3590884f3",
  "f37252ab-a362-4fce-8e94-64757f163c52",
  "01b25d25-78eb-41bb-a9a1-02400a937bf2",
  "c150d226-efd9-4ea3-85dd-676bd12b59d3",
  "1d3b1d0b-84a3-4888-a986-8007530a5a48",
  "c7de1683-8627-4ab9-9fb3-be929431ee12",
  "45156427-3bac-4fc4-ba19-a4244d230899",
  "15fe9f99-2ed4-4894-8959-bd13324bee67",
  "3a80a030-6ee7-4776-b199-9129ca1a2e67",
  "ee16887a-2523-4eda-8423-f2e3ecc8d268",
  "599d5119-a568-4cd1-83d9-867a00f53872",
  "70a99969-fd03-422e-aacb-19f05533c0c6",
  "6ad34b9b-8739-4d31-bc65-890feb4f1efe",
  "393ddfc5-537c-4cff-b9d4-198480991ebf",
  "1bf52087-db05-469f-9493-8d9bd5b0c35c",
  "1c1f5f2f-fe48-4fca-baf6-98acb8b8c0a3",
  "11ab6621-8761-41ee-a2ff-31422c713935",
  "c23f5d65-858a-477a-aebb-1f5359612de5",
  "138f7f77-3984-4688-bbe2-8a050e95bc54",
  "b3908939-24e9-4514-8582-34a7057847db",
  "0e175c64-6c1a-41a3-b9e3-ab9316a048ba",
  "e5d308e7-efa7-4593-bcfb-1d4d4be7d71f",
  "5dbf2fc8-0642-4d39-8a00-52335d56fa21",
  "3b38cf34-e18f-4379-b836-c4a44810c2ec",
  "185a9c40-764c-412a-b584-577a3923bd36",
  "3e976cb3-c4b8-4bc8-b114-ab00aabeaba3",
  "5536bf29-b0f4-4009-b19a-538040cd8d54",
  "03eb2144-5320-4a57-89c4-c6db46079393",
  "717220b6-2893-4588-921c-359a2d28c859",
  "597eb010-b094-4c4e-98c0-4dd51dbeda72",
  "2e91aba3-f921-4551-8d89-79bde070d47b",
  "2679a09f-a0d9-4564-8daa-1e0d0c905dcc",
  "3495170d-01c9-4526-878e-7c85a91023ef",
  "5ec1ffae-ffde-48f7-b56f-b44a898e9d5a",
  "7ba03286-dcba-4319-aa10-fdeff8437cd4",
  "c51e6ecd-8da6-44cf-b344-dbc372ae6307",
  "48fed542-ab12-4d6c-a4e3-c527cf6df27e",
  "80f884b7-e4c9-4a4f-9d6a-866f9ba9a38d",
  "2ed3a4af-2958-41c0-a3ab-7b1f3d0d2dfe",
  "8f4c3409-e633-4906-83e4-5b103133ec8f",
  "7430c779-014e-4b11-b0f5-1dae08206ec8",
  "52e21b6a-1cb6-4ee5-aa6d-759d5a957681",
  "f9742805-afd4-46f6-ada8-3d0493d86dd5",
  "acdff36e-358d-4afe-a334-760c6a5fe963",
  "27e8ea57-d4c5-4172-a0e4-b07a64310356",
  "5490f0a0-231b-4bf3-86c4-ad2b3dfbf098",
  "7de472e2-0bfa-484f-b20e-8daecd28d5a6",
  "e2150cc2-ed55-4ed1-b748-b6a3eb3d2c58",
  "b431b485-10b2-4b8a-a1be-8d6656a99c5d",
  "adfa16c2-930b-4ef9-950b-14b819aa55f1",
  "cdd310cc-3dbc-4df5-9131-cf042ce313a3",
  "8ad43e6f-f4b5-433e-a592-801ab8d1cbbf",
  "a4880641-1cc2-4496-ae8b-81d4a307dc5a",
  "06bd7b2f-042b-4baa-8007-6044764cad70",
  "e1abc97b-e391-4673-a896-bc0292228737",
  "e3711634-59d7-4e31-9747-2d0d9404f570",
  "6d295a97-d222-4e64-8809-f79e261c70d3",
  "4163f565-6be5-42ec-823c-27b09b39472b",
  "3c20827a-a8a7-490a-b71b-59c0403a34eb",
  "d0f0de8f-fcf7-405a-b662-96c31c85129b",
  "2d93d21e-773a-4e30-88d2-afc5224a6c76",
  "e05a887f-5c20-4feb-8480-f24ec0041dbe",
  "5d07d8f8-a09b-4678-a19e-baf29ae16c6d",
  "90feaf0e-fea6-4f89-b56f-314926338323",
  "17e8f6a6-544c-478d-addf-a53efd6b4172",
  "8bd7d4cb-73bc-4c8b-8ab7-bfe0eed4b1bb",
  "201b8bfe-dbb9-4517-8778-6239dee50f38",
  "b13371ec-e57a-4eb6-8792-94ddd96e4dfa",
  "4cbe2e33-d52e-48eb-b77d-dbd6012083e7",
  "8f9b12bd-845b-4800-ac84-c819aeb7bf3f",
  "fc791495-9605-440d-9103-265873123ef9",
  "1ea7ab2c-b35c-4b84-a48b-6f89da05beff",
];

const QRCodesGenerator = () => {
  return (
    <div className="z-500 overflow-auto bg-white">
      <div className="grid w-screen grid-cols-2">
        {QRCODES.map((code, idx) => {
          return (
            <div
              className={cn(
                `flex h-[calc(100vh/2)] flex-col border-black/5
                p-6`,
                  idx % 4 == 0 && `border-b-[0.5px] border-r-[0.5px]`,
                  idx % 4 == 1 && `border-b-[0.5px] border-l-[0.5px]`,
                  idx % 4 == 2 && `border-t-[0.5px] border-r-[0.5px]`,
                  idx % 4 == 3 && `border-t-[0.5px] border-l-[0.5px]`,
              )}
            >
              <div>
                <p>พาสปอร์ตกระดาษ</p>
                <p
                  className="text-secondary -mt-1.5 text-2xl font-bold
                    tracking-tight"
                >
                  Open House 2026
                </p>
              </div>
              <div className="relative grow">
                <Image
                  src={"/qr-logo.png"}
                  width={1080}
                  height={1080}
                  alt="rings_sec"
                  className="absolute top-1/2 left-1/2 z-10000 aspect-square
                    h-18 w-18 -translate-1/2"
                />
                <div
                  className="absolute top-1/2 left-1/2 z-1000 aspect-square
                    w-[75%] -translate-1/2 rounded-xl border-2 border-solid
                    border-[#FFCDCD] bg-white p-3"
                >
                  <QRCode
                    value={"https://o.mysk.school/p/" + code}
                    className="aspect-square h-full w-full"
                    bgColor="transparent"
                    level="Q"
                  />
                </div>
                <Image
                  src={"/rings-sec.svg"}
                  width={1080}
                  height={1080}
                  alt="rings_sec"
                  className="object-fit aspect-square w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] opacity-50">พาสปอร์ตนี้เป็นของ</p>
                  <div
                    className="h-6.5 rounded-sm border border-solid
                      border-[#FCCDCD]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[12px] opacity-50">ติดต่อได้ที่</p>
                  <div
                    className="h-6.5 rounded-sm border border-solid
                      border-[#FCCDCD]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QRCodesGenerator;
