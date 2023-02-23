import {ethers} from 'ethers';
import VAULT_ABI from '@yearn-finance/web-lib/utils/abi/vault.abi';


export async function	withdrawShares(
	provider: ethers.providers.JsonRpcProvider,
	vaultAddress: string,
	maxShares: ethers.BigNumber
): Promise<boolean> {
	const	signer = provider.getSigner();

	try {
		const	contract = new ethers.Contract(
			vaultAddress,
			VAULT_ABI,
			signer
		);
		const	transaction = await contract.withdraw(maxShares);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 0) {
			console.error('Fail to perform transaction');
			return false;
		}

		return true;
	} catch(error) {
		console.error(error);
		return false;
	}
}
