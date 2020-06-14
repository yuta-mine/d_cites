pragma solidity >=0.5.16 <0.7.0;
pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract Marketplace is ERC721Full {
    string public name;
    uint256 public productCount = 0;

    mapping(uint256 => Product) public products;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;

    struct Product {
        uint256 id;
        string country;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
        address buyer;
        bool approvedFromOwnerToBuyer;
        bool sended;
        address approver;
        string tokenURI;
    }

    event ProductCreated(
        uint256 id,
        string country,
        string name,
        uint256 price,
        address owner,
        bool purchased,
        address buyer,
        bool approvedFromOwnerToBuyer,
        bool sended,
        address approver,
        string tokenURI
    );

    event ProductPurchased(
        uint256 id,
        string country,
        string name,
        uint256 price,
        address payable owner,
        bool purchased,
        address buyer,
        bool approvedFromOwnerToBuyer,
        bool sended,
        address approver,
        string tokenURI
    );

    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event Mint(address owner, uint256 id);

    constructor(string memory _name, string memory _symbol)
        public
        ERC721Full(_name, _symbol)
    {
        name = "cites";
        _symbol = "CITES";
    }

    //商品登録
    function createProduct(
        string memory _country,
        string memory _name,
        uint256 _price,
        address _approver,
        string memory _tokenURI
    ) public {
        require(bytes(_name).length > 0);
        require(_price > 0);

        productCount++; //トークンIDと同義
        _tokenURIs[productCount] = _tokenURI;
        // _setTokenURI(productCount, _tokenURI);
        products[productCount] = Product(
            productCount,
            _country,
            _name,
            _price,
            msg.sender,
            false,
            msg.sender,
            false,
            false,
            _approver,
            _tokenURIs[productCount]
        );

        super._mint(msg.sender, productCount); //商品登録した人にトークンを付与

        emit Mint(msg.sender, productCount);
        emit ProductCreated(
            productCount,
            _country,
            _name,
            _price,
            msg.sender,
            false,
            msg.sender, //購入者 = 出品した人（仮）
            false,
            false,
            _approver,
            _tokenURIs[productCount]
        );
    }

    //画像登録URI設定
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(_exists(tokenId));
        _tokenURIs[tokenId] = _tokenURI;
    }

    //商品閲覧
    // function productreturn(address _owner) public view returns (Product memory) {
    //     return productsOfOwner[_owner];
    // }

    //商品購入意思表示
    function purchaseProduct(uint256 _id) public {
        Product storage _product = products[_id];

        address payable _seller = _product.owner;

        // require(_product.id > 0 && _product.id <= productCount);
        // require(!_product.purchased);
        require(_product.owner != msg.sender);

        _product.country;
        _product.buyer = msg.sender;
        _product.purchased = true; //購入済みに更新
        _product.approver;
        _product.tokenURI;
        products[_id] = _product; //更新

        // address(_seller).transfer(msg.value); //コントラクトアドレスへデポジット？？？
        emit ProductPurchased(
            productCount,
            _product.country,
            _product.name,
            _product.price,
            _seller,
            true, //purchased
            msg.sender, //購入した人
            false, //non approved
            false, //non sended
            _product.approver,
            _product.tokenURI
        );
    }

    //承認(承認者 → 買い手）
    function approve(address _to, uint256 _id) public {
        // function approve(address _to, uint256 _id) public {
        Product storage _product = products[_id];
        address _owner = _product.owner;

        // address owner = ownerOf(_id); //オーナーののみ発動

        require(_product.approver == msg.sender); //重要
        // require(_msgSender() == owner || isApprovedForAll(owner, _msgSender()));
        require(_product.purchased);

        _tokenApprovals[_id] = _to;
        emit Approval(_owner, _to, _id);

        _product.country;
        _product.approvedFromOwnerToBuyer = true;
        _product.approver;
        _product.tokenURI;
        products[_id] = _product;

        emit ProductCreated(
            productCount,
            _product.country,
            _product.name,
            _product.price,
            _owner,
            true, //purchased
            _tokenApprovals[_id], //購入者 = 承認された人
            true, // approved
            false, //non sended
            _product.approver,
            _product.tokenURI
        );
    }

    //CITES、運送業者 → 買い手へ承認(5/3移以降に実装)
    // function middlemanApprove(address from, address _to, uint _id) public returns(bool){
    // }

    // 商品購入、送金（買い手 → 売り手）
    function sendMoney(uint256 _id) public payable {
        Product storage _product = products[_id];
        address payable _seller = _product.owner;

        require(_product.id > 0 && _product.id <= productCount);
        // require(msg.value >= _product.price);
        // require(_product.purchased); //※※これが何故か引っかかる
        require(_product.approvedFromOwnerToBuyer);
        require(_product.owner != msg.sender);
        // require(getApproved(_id) == msg.sender); //※※これが何故か引っかかる

        // 購入済みかどうか
        _product.country;
        _product.owner = msg.sender;
        _product.sended = true;
        _product.approver;
        _product.tokenURI;
        products[_id] = _product;
        address(_seller).transfer(msg.value);

        emit ProductPurchased(
            productCount,
            _product.country,
            _product.name,
            _product.price,
            _product.owner,
            true, //purchased
            msg.sender, //購入者 = 送金した人
            true, // approved
            true, //sended
            _product.approver,
            _product.tokenURI
        );
    }
}
