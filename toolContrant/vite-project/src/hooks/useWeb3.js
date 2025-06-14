import Web3 from "web3";
import socialJSON from "@/contracts/SocialMedia.json";

const useWeb3 = () => {
  let web3;
  let socialContract;
  const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;

  try {
    // 使用 MetaMask 提供的 Web3 提供者
    if (typeof window.ethereum !== "undefined") {
      web3 = new Web3(window.ethereum);

      // 監聽帳戶變更事件
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          alert("MetaMask 錢包已被鎖定或未連接。請重新連接。");
        } else {
          console.log("帳戶已更改: ", accounts[0]);
        }
      });

      // 檢查是否已經授權帳戶
      window.ethereum.request({ method: "eth_accounts" })
        .then(accounts => {
          if (accounts.length === 0) {
            return window.ethereum.request({ method: "eth_requestAccounts" });
          }
          return accounts;
        })
        .then(accounts => {
          console.log("已獲取帳號: ", accounts);
        })
        .catch(error => {
          console.error("捕捉到的錯誤: ", error);
          alert("MetaMask 授權失敗，請檢查設置或稍後重試。");
        });

    } else if (typeof window.web3 !== "undefined") {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Please install MetaMask to use this dapp!");
      throw new Error("MetaMask not installed");
    }

    // 確認 web3 是否正確初始化
    if (!web3) {
      throw new Error("Web3 initialization failed");
    }

    // 確認合約地址已設置
    if (!contractAddress) {
      throw new Error("Contract address is not set in environment variables");
    }

    // 創建合約實例
    socialContract = new web3.eth.Contract(socialJSON.abi, contractAddress);
  } catch (error) {
    console.error(error.message);
    return { web3: undefined, socialContract: undefined, contractAddress: undefined, getAccount: undefined };
  }

  // 獲取帳戶的異步函數
  const getAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        // 如果沒有帳戶，請求授權
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }
      return accounts[0] || null;
    } catch (error) {
      console.error("MetaMask 錯誤對象: ", error);  // 打印整個錯誤對象
      if (error.code === -32002) {
        alert("MetaMask 已經在處理連接請求，請稍候...");
      } else if (error.code === -32602) {
        alert("無效的請求參數，請檢查 MetaMask 設置。");
      } else {
        alert("MetaMask 授權錯誤，請稍後重試。");
      }
      return null;
    }
  };


  return { web3, socialContract, contractAddress, getAccount };
};

export default useWeb3;
