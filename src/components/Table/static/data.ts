export const dataWithItems = {
    "_count": 2,
    "_links": {
        "item": [
            {
                "summary": {
                    "postal_address:preferred": true,
                    "postal_address:city_name": "PARIS",
                    "postal_address:format_type": null,
                    "postal_address:confidential": false,
                    "postal_address:country_code": "FR",
                    "postal_address:tax_address": false,
                    "postal_address:postal_code": "75001",
                    "postal_address:display_id": "Preferred, Private, 15 RUE Fleures, 75001 PARIS, FRANCE"
                },
                "name": "15 RUE Fleures  , 75001 PARIS, FRANCE",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses/ID-qeH5T7RcB",
                "title": "15 RUE Fleures  , 75001 PARIS, FRANCE"
            },
            {
                "summary": {
                    "postal_address:preferred": false,
                    "postal_address:city_name": "CHARENTON LE PONT",
                    "postal_address:format_type": null,
                    "postal_address:confidential": true,
                    "postal_address:country_code": "FR",
                    "postal_address:tax_address": false,
                    "postal_address:postal_code": "94220",
                    "postal_address:display_id": "Private, 52 RUE Nouvelle, 94220 CHARENTON LE PONT, FRANCE"
                },
                "name": "52 RUE Nouvelle  , 94220 CHARENTON LE PONT, FRANCE",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses/ID-qeH5T7Rev",
                "title": "52 RUE Nouvelle  , 94220 CHARENTON LE PONT, FRANCE"
            }
        ],
        "self": {
            "name": "Postal Address",
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
            "title": "Postal Address"
        },
        "up": {
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D"
        },
        "cscrel:item-type": {
            "href": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressDocument"
        },
        "type": [
            {
                "href": "http://20.33.40.147:13111/csc/insurance/schemas/system/factory"
            },
            {
                "href": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressCollection"
            }
        ],
        "first": {
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses?_num=20"
        }
    },
    "_options": {
        "links": [
            {
                "schema": {
                    "properties": {
                        "_count": {
                            "type": "integer",
                            "minimum": 500
                        },
                        "_start": {
                            "type": "integer",
                            "minimum": 0
                        },
                        "_embed": {
                            "oneOf": [
                                {
                                    "const": "none"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ]
                        },
                        "_options": {
                            "type": "boolean"
                        },
                        "_num": {
                            "type": "integer",
                            "minimum": 20
                        },
                        "_sort": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                },
                "method": "GET",
                "rel": "search",
                "mediaType": "application/vnd.hal+json",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
                "title": "Search for a Postal Address  by criteria"
            },
            {
                "schema": {
                    "type": "object",
                    "properties": {
                        "postal_address:street_number": {
                            "type": "string",
                            "maxLength": 15
                        },
                        "postal_address:residence_line": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:city_name": {
                            "type": "string",
                            "maxLength": 70
                        },
                        "postal_address:master_mode": {
                            "type": "boolean"
                        },
                        "postal_address:i_n_s_e_e_code": {
                            "type": "string",
                            "maxLength": 5
                        },
                        "postal_address:p_o_box": {
                            "type": "string",
                            "maxLength": 28
                        },
                        "postal_address:additional_info": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:type": {
                            "oneOf": [
                                {
                                    "description": "language:en-GB",
                                    "title": "Primary",
                                    "enum": [
                                        "primary"
                                    ]
                                },
                                {
                                    "description": "language:en-GB",
                                    "title": "Secondary",
                                    "enum": [
                                        "secondary"
                                    ]
                                }
                            ],
                            "type": "string"
                        },
                        "postal_address:g_p_s_latitude": {
                            "maximum": 99999.99999999999999999999E0,
                            "type": "number"
                        },
                        "postal_address:office_distributor": {
                            "type": "string",
                            "maxLength": 60
                        },
                        "postal_address:district_line": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:street_line": {
                            "type": "string",
                            "maxLength": 160
                        },
                        "postal_address:street_type": {
                            "oneOf": [
                                {
                                    "title": "CALLE",
                                    "enum": [
                                        "calle"
                                    ]
                                },
                                {
                                    "title": "FOYER",
                                    "enum": [
                                        "FOYR"
                                    ]
                                },
                                {
                                    "title": "FOSSE",
                                    "enum": [
                                        "FOS"
                                    ]
                                },
                                {
                                    "title": "FORUM",
                                    "enum": [
                                        "FORM"
                                    ]
                                },
                                {
                                    "title": "FORT",
                                    "enum": [
                                        "FORT"
                                    ]
                                },
                                {
                                    "title": "FONTAINE",
                                    "enum": [
                                        "FON"
                                    ]
                                },
                                {
                                    "title": "FERME",
                                    "enum": [
                                        "FRM"
                                    ]
                                },
                                {
                                    "title": "FAUBOURG",
                                    "enum": [
                                        "FG"
                                    ]
                                },
                                {
                                    "title": "ETANG",
                                    "enum": [
                                        "ETNG"
                                    ]
                                },
                                {
                                    "title": "ESPLANADE",
                                    "enum": [
                                        "ESP"
                                    ]
                                },
                                {
                                    "title": "ESPACE",
                                    "enum": [
                                        "ESPA"
                                    ]
                                },
                                {
                                    "title": "ESCALIER",
                                    "enum": [
                                        "ESC"
                                    ]
                                },
                                {
                                    "title": "ENCLOS",
                                    "enum": [
                                        "ENC"
                                    ]
                                },
                                {
                                    "title": "ENCLAVE",
                                    "enum": [
                                        "ENV"
                                    ]
                                },
                                {
                                    "title": "ENCEINTE",
                                    "enum": [
                                        "EN"
                                    ]
                                },
                                {
                                    "title": "EGLISE",
                                    "enum": [
                                        "EGL"
                                    ]
                                },
                                {
                                    "title": "ECLUSE",
                                    "enum": [
                                        "ECL"
                                    ]
                                },
                                {
                                    "title": "DOMAINE",
                                    "enum": [
                                        "DOM"
                                    ]
                                },
                                {
                                    "title": "DIGUE",
                                    "enum": [
                                        "DIG"
                                    ]
                                },
                                {
                                    "title": "DESCENTE",
                                    "enum": [
                                        "DSC"
                                    ]
                                },
                                {
                                    "title": "DEGRE",
                                    "enum": [
                                        "DEG"
                                    ]
                                },
                                {
                                    "title": "DARSE",
                                    "enum": [
                                        "DARS"
                                    ]
                                },
                                {
                                    "title": "COURS",
                                    "enum": [
                                        "CRS"
                                    ]
                                },
                                {
                                    "title": "COUR",
                                    "enum": [
                                        "COUR"
                                    ]
                                },
                                {
                                    "title": "COTTAGE",
                                    "enum": [
                                        "COTT"
                                    ]
                                },
                                {
                                    "title": "COTE",
                                    "enum": [
                                        "COTE"
                                    ]
                                },
                                {
                                    "title": "CORNICHE",
                                    "enum": [
                                        "COR"
                                    ]
                                },
                                {
                                    "title": "CONTOUR",
                                    "enum": [
                                        "CTR"
                                    ]
                                },
                                {
                                    "title": "COLLINE",
                                    "enum": [
                                        "COLI"
                                    ]
                                },
                                {
                                    "title": "COL",
                                    "enum": [
                                        "COL"
                                    ]
                                },
                                {
                                    "title": "CLOS",
                                    "enum": [
                                        "CLOS"
                                    ]
                                },
                                {
                                    "title": "CLOITRE",
                                    "enum": [
                                        "CLOI"
                                    ]
                                },
                                {
                                    "title": "CITE",
                                    "enum": [
                                        "CITE"
                                    ]
                                },
                                {
                                    "title": "CHEZ",
                                    "enum": [
                                        "CHEZ"
                                    ]
                                },
                                {
                                    "title": "CHEMINEMENT",
                                    "enum": [
                                        "CHEM"
                                    ]
                                },
                                {
                                    "title": "CHEMIN VICINAL",
                                    "enum": [
                                        "CHV"
                                    ]
                                },
                                {
                                    "title": "CHEMIN",
                                    "enum": [
                                        "CHE"
                                    ]
                                },
                                {
                                    "title": "CHAUSSEE",
                                    "enum": [
                                        "CHS"
                                    ]
                                },
                                {
                                    "title": "CHATEAU",
                                    "enum": [
                                        "CHT"
                                    ]
                                },
                                {
                                    "title": "CHARMILLE",
                                    "enum": [
                                        "CHI"
                                    ]
                                },
                                {
                                    "title": "CHAPELLE",
                                    "enum": [
                                        "CHP"
                                    ]
                                },
                                {
                                    "title": "CHALET",
                                    "enum": [
                                        "CHL"
                                    ]
                                },
                                {
                                    "title": "CENTRE COMMERCIAL",
                                    "enum": [
                                        "CCAL"
                                    ]
                                },
                                {
                                    "title": "CENTRE",
                                    "enum": [
                                        "CTRE"
                                    ]
                                },
                                {
                                    "title": "CAVEE",
                                    "enum": [
                                        "CAV"
                                    ]
                                },
                                {
                                    "title": "CASTEL",
                                    "enum": [
                                        "CST"
                                    ]
                                },
                                {
                                    "title": "CARRIERE",
                                    "enum": [
                                        "CARE"
                                    ]
                                },
                                {
                                    "title": "CARREFOUR",
                                    "enum": [
                                        "CAR"
                                    ]
                                },
                                {
                                    "title": "CARREAU",
                                    "enum": [
                                        "CAU"
                                    ]
                                },
                                {
                                    "title": "CARRE",
                                    "enum": [
                                        "CARR"
                                    ]
                                },
                                {
                                    "title": "CAMPING",
                                    "enum": [
                                        "CPG"
                                    ]
                                },
                                {
                                    "title": "CAMPAGNE",
                                    "enum": [
                                        "CGNE"
                                    ]
                                },
                                {
                                    "title": "CAMP",
                                    "enum": [
                                        "CAMP"
                                    ]
                                },
                                {
                                    "title": "CALE",
                                    "enum": [
                                        "CALE"
                                    ]
                                },
                                {
                                    "title": "POURTOUR",
                                    "enum": [
                                        "POUR"
                                    ]
                                },
                                {
                                    "title": "POTERNE",
                                    "enum": [
                                        "POT"
                                    ]
                                },
                                {
                                    "title": "PORTIQUE",
                                    "enum": [
                                        "PORQ"
                                    ]
                                },
                                {
                                    "title": "PORTE",
                                    "enum": [
                                        "PTE"
                                    ]
                                },
                                {
                                    "title": "PORT",
                                    "enum": [
                                        "PORT"
                                    ]
                                },
                                {
                                    "title": "PONT",
                                    "enum": [
                                        "PONT"
                                    ]
                                },
                                {
                                    "title": "POINTE",
                                    "enum": [
                                        "PNT"
                                    ]
                                },
                                {
                                    "title": "PLATEAU",
                                    "enum": [
                                        "PLT"
                                    ]
                                },
                                {
                                    "title": "PLAN",
                                    "enum": [
                                        "PLAN"
                                    ]
                                },
                                {
                                    "title": "PLAINE",
                                    "enum": [
                                        "PLN"
                                    ]
                                },
                                {
                                    "title": "PLAGE",
                                    "enum": [
                                        "PLAG"
                                    ]
                                },
                                {
                                    "title": "PLACIS",
                                    "enum": [
                                        "PLCI"
                                    ]
                                },
                                {
                                    "title": "PLACE",
                                    "enum": [
                                        "PL"
                                    ]
                                },
                                {
                                    "title": "PETITE ALLEE",
                                    "enum": [
                                        "PTA"
                                    ]
                                },
                                {
                                    "title": "PETITE RUE",
                                    "enum": [
                                        "PTR"
                                    ]
                                },
                                {
                                    "title": "PETITE ROUTE",
                                    "enum": [
                                        "PRT"
                                    ]
                                },
                                {
                                    "title": "PETITE IMPASSE",
                                    "enum": [
                                        "PIM"
                                    ]
                                },
                                {
                                    "title": "PETITE AVENUE",
                                    "enum": [
                                        "PAE"
                                    ]
                                },
                                {
                                    "title": "PETIT CHEMIN",
                                    "enum": [
                                        "PCH"
                                    ]
                                },
                                {
                                    "title": "PERISTYLE",
                                    "enum": [
                                        "PSTY"
                                    ]
                                },
                                {
                                    "title": "PERIPHERIQUE",
                                    "enum": [
                                        "PERI"
                                    ]
                                },
                                {
                                    "title": "PAVILLON",
                                    "enum": [
                                        "PAV"
                                    ]
                                },
                                {
                                    "title": "PATIO",
                                    "enum": [
                                        "PAT"
                                    ]
                                },
                                {
                                    "title": "PASSERELLE",
                                    "enum": [
                                        "PLE"
                                    ]
                                },
                                {
                                    "title": "PASSE",
                                    "enum": [
                                        "PASS"
                                    ]
                                },
                                {
                                    "title": "PASSAGE A NIVEAU",
                                    "enum": [
                                        "PN"
                                    ]
                                },
                                {
                                    "title": "PASSAGE",
                                    "enum": [
                                        "PAS"
                                    ]
                                },
                                {
                                    "title": "PARVIS",
                                    "enum": [
                                        "PRV"
                                    ]
                                },
                                {
                                    "title": "PARKING",
                                    "enum": [
                                        "PKG"
                                    ]
                                },
                                {
                                    "title": "PARC",
                                    "enum": [
                                        "PARC"
                                    ]
                                },
                                {
                                    "title": "PALAIS",
                                    "enum": [
                                        "PAL"
                                    ]
                                },
                                {
                                    "title": "NOUVELLE ROUTE",
                                    "enum": [
                                        "NTE"
                                    ]
                                },
                                {
                                    "title": "MUSEE",
                                    "enum": [
                                        "MUS"
                                    ]
                                },
                                {
                                    "title": "MOULIN",
                                    "enum": [
                                        "MLN"
                                    ]
                                },
                                {
                                    "title": "MONTEE",
                                    "enum": [
                                        "MTE"
                                    ]
                                },
                                {
                                    "title": "METRO",
                                    "enum": [
                                        "MET"
                                    ]
                                },
                                {
                                    "title": "MAS",
                                    "enum": [
                                        "MAS"
                                    ]
                                },
                                {
                                    "title": "MARCHE",
                                    "enum": [
                                        "MAR"
                                    ]
                                },
                                {
                                    "title": "MANOIR",
                                    "enum": [
                                        "MAN"
                                    ]
                                },
                                {
                                    "title": "MAISON FORESTIERE",
                                    "enum": [
                                        "MF"
                                    ]
                                },
                                {
                                    "title": "MAIL",
                                    "enum": [
                                        "MAIL"
                                    ]
                                },
                                {
                                    "title": "LOTISSEMENT",
                                    "enum": [
                                        "LOT"
                                    ]
                                },
                                {
                                    "title": "LIEU DIT",
                                    "enum": [
                                        "LD"
                                    ]
                                },
                                {
                                    "title": "LEVEE",
                                    "enum": [
                                        "LEVE"
                                    ]
                                },
                                {
                                    "title": "JETEE",
                                    "enum": [
                                        "JTE"
                                    ]
                                },
                                {
                                    "title": "JARDIN",
                                    "enum": [
                                        "JARD"
                                    ]
                                },
                                {
                                    "title": "IMPASSE",
                                    "enum": [
                                        "IMP"
                                    ]
                                },
                                {
                                    "title": "IMMEUBLE",
                                    "enum": [
                                        "IMM"
                                    ]
                                },
                                {
                                    "title": "ILE",
                                    "enum": [
                                        "ILE"
                                    ]
                                },
                                {
                                    "title": "HLM",
                                    "enum": [
                                        "HLM"
                                    ]
                                },
                                {
                                    "title": "HIPPODROME",
                                    "enum": [
                                        "HIP"
                                    ]
                                },
                                {
                                    "title": "HAUT CHEMIN",
                                    "enum": [
                                        "HCH"
                                    ]
                                },
                                {
                                    "title": "HAMEAU",
                                    "enum": [
                                        "HAM"
                                    ]
                                },
                                {
                                    "title": "HALLES",
                                    "enum": [
                                        "HLE"
                                    ]
                                },
                                {
                                    "title": "GROUPEMENT",
                                    "enum": [
                                        "GPT"
                                    ]
                                },
                                {
                                    "title": "GROUPE",
                                    "enum": [
                                        "GPE"
                                    ]
                                },
                                {
                                    "title": "GRIMPETTE",
                                    "enum": [
                                        "GRIM"
                                    ]
                                },
                                {
                                    "title": "GRILLE",
                                    "enum": [
                                        "GRI"
                                    ]
                                },
                                {
                                    "title": "GRAND ENSEMBLE",
                                    "enum": [
                                        "GDEN"
                                    ]
                                },
                                {
                                    "title": "GRANDE RUE",
                                    "enum": [
                                        "GR"
                                    ]
                                },
                                {
                                    "title": "GRAND BOULEVARD",
                                    "enum": [
                                        "GBD"
                                    ]
                                },
                                {
                                    "title": "GARENNE",
                                    "enum": [
                                        "GARN"
                                    ]
                                },
                                {
                                    "title": "GARE",
                                    "enum": [
                                        "GARE"
                                    ]
                                },
                                {
                                    "title": "GALERIE",
                                    "enum": [
                                        "GAL"
                                    ]
                                },
                                {
                                    "title": "BUTTE",
                                    "enum": [
                                        "BUT"
                                    ]
                                },
                                {
                                    "title": "BOURG",
                                    "enum": [
                                        "BRG"
                                    ]
                                },
                                {
                                    "title": "BOULEVARD",
                                    "enum": [
                                        "BD"
                                    ]
                                },
                                {
                                    "title": "BOUCLE",
                                    "enum": [
                                        "BCLE"
                                    ]
                                },
                                {
                                    "title": "BOIS",
                                    "enum": [
                                        "BOIS"
                                    ]
                                },
                                {
                                    "title": "BERGE",
                                    "enum": [
                                        "BER"
                                    ]
                                },
                                {
                                    "title": "BEGUINAGE",
                                    "enum": [
                                        "BEGI"
                                    ]
                                },
                                {
                                    "title": "BASTON",
                                    "enum": [
                                        "BAST"
                                    ]
                                },
                                {
                                    "title": "BASTIDE",
                                    "enum": [
                                        "BSTD"
                                    ]
                                },
                                {
                                    "title": "BAS CHEMIN",
                                    "enum": [
                                        "BCH"
                                    ]
                                },
                                {
                                    "title": "BARRIERE",
                                    "enum": [
                                        "BRE"
                                    ]
                                },
                                {
                                    "title": "AVENUE",
                                    "enum": [
                                        "AV"
                                    ]
                                },
                                {
                                    "title": "AUTOROUTE",
                                    "enum": [
                                        "AUT"
                                    ]
                                },
                                {
                                    "title": "ARCADE",
                                    "enum": [
                                        "ARC"
                                    ]
                                },
                                {
                                    "title": "ANSE",
                                    "enum": [
                                        "ANSE"
                                    ]
                                },
                                {
                                    "title": "ANCIENNE ROUTE",
                                    "enum": [
                                        "ART"
                                    ]
                                },
                                {
                                    "title": "ANCIEN CHEMIN",
                                    "enum": [
                                        "ACH"
                                    ]
                                },
                                {
                                    "title": "ALLEE",
                                    "enum": [
                                        "ALL"
                                    ]
                                },
                                {
                                    "title": "AIRE",
                                    "enum": [
                                        "AIRE"
                                    ]
                                },
                                {
                                    "title": "AGGLOMERATION",
                                    "enum": [
                                        "AGL"
                                    ]
                                },
                                {
                                    "title": "ABBAYE",
                                    "enum": [
                                        "ABE"
                                    ]
                                },
                                {
                                    "title": "ZONE INDUSTRIELLE",
                                    "enum": [
                                        "ZI"
                                    ]
                                },
                                {
                                    "title": "ZONE D'AMENAGEMENT DIFFERE",
                                    "enum": [
                                        "ZAD"
                                    ]
                                },
                                {
                                    "title": "ZONE D'AMENAGEMENT CONCERTE",
                                    "enum": [
                                        "ZAC"
                                    ]
                                },
                                {
                                    "title": "ZONE ARTISANALE",
                                    "enum": [
                                        "ZA"
                                    ]
                                },
                                {
                                    "title": "ZONE A URBANISER EN PRIORITE",
                                    "enum": [
                                        "ZUP"
                                    ]
                                },
                                {
                                    "title": "ZONE",
                                    "enum": [
                                        "ZONE"
                                    ]
                                },
                                {
                                    "title": "VOIE",
                                    "enum": [
                                        "VOI"
                                    ]
                                },
                                {
                                    "title": "VILLAGE",
                                    "enum": [
                                        "VGE"
                                    ]
                                },
                                {
                                    "title": "VILLA",
                                    "enum": [
                                        "VLA"
                                    ]
                                },
                                {
                                    "title": "VIEUX CHEMIN",
                                    "enum": [
                                        "VCHE"
                                    ]
                                },
                                {
                                    "title": "VIEILLE ROUTE",
                                    "enum": [
                                        "VTE"
                                    ]
                                },
                                {
                                    "title": "VIA",
                                    "enum": [
                                        "VIA"
                                    ]
                                },
                                {
                                    "title": "VENELLE",
                                    "enum": [
                                        "VEN"
                                    ]
                                },
                                {
                                    "title": "VAL - VALLEE - VALLON",
                                    "enum": [
                                        "VAL"
                                    ]
                                },
                                {
                                    "title": "TRAVERSE",
                                    "enum": [
                                        "TRA"
                                    ]
                                },
                                {
                                    "title": "TOUR",
                                    "enum": [
                                        "TOUR"
                                    ]
                                },
                                {
                                    "title": "TERTRE",
                                    "enum": [
                                        "TRT"
                                    ]
                                },
                                {
                                    "title": "TERRE PLEIN",
                                    "enum": [
                                        "TPL"
                                    ]
                                },
                                {
                                    "title": "TERRASSE",
                                    "enum": [
                                        "TSSE"
                                    ]
                                },
                                {
                                    "title": "TERRAIN",
                                    "enum": [
                                        "TRN"
                                    ]
                                },
                                {
                                    "title": "TERASSE",
                                    "enum": [
                                        "TER"
                                    ]
                                },
                                {
                                    "title": "STATION",
                                    "enum": [
                                        "STA"
                                    ]
                                },
                                {
                                    "title": "STADE",
                                    "enum": [
                                        "STDE"
                                    ]
                                },
                                {
                                    "title": "SQUARE",
                                    "enum": [
                                        "SQ"
                                    ]
                                },
                                {
                                    "title": "SENTIER",
                                    "enum": [
                                        "SEN"
                                    ]
                                },
                                {
                                    "title": "RUELLE",
                                    "enum": [
                                        "RLE"
                                    ]
                                },
                                {
                                    "title": "RUE",
                                    "enum": [
                                        "R"
                                    ]
                                },
                                {
                                    "title": "ROUTE",
                                    "enum": [
                                        "RTE"
                                    ]
                                },
                                {
                                    "title": "ROTONDE",
                                    "enum": [
                                        "RTD"
                                    ]
                                },
                                {
                                    "title": "ROQUET",
                                    "enum": [
                                        "ROQT"
                                    ]
                                },
                                {
                                    "title": "ROND POINT",
                                    "enum": [
                                        "RPT"
                                    ]
                                },
                                {
                                    "title": "ROCADE",
                                    "enum": [
                                        "ROC"
                                    ]
                                },
                                {
                                    "title": "RESIDENCE",
                                    "enum": [
                                        "RES"
                                    ]
                                },
                                {
                                    "title": "REMPART",
                                    "enum": [
                                        "REM"
                                    ]
                                },
                                {
                                    "title": "RAMPE",
                                    "enum": [
                                        "RPE"
                                    ]
                                },
                                {
                                    "title": "RAIDILLON",
                                    "enum": [
                                        "RAID"
                                    ]
                                },
                                {
                                    "title": "RACCOURCI",
                                    "enum": [
                                        "RAC"
                                    ]
                                },
                                {
                                    "title": "QUARTIER",
                                    "enum": [
                                        "QUA"
                                    ]
                                },
                                {
                                    "title": "QUAI",
                                    "enum": [
                                        "QU"
                                    ]
                                },
                                {
                                    "title": "PROMENADE",
                                    "enum": [
                                        "PROM"
                                    ]
                                },
                                {
                                    "title": "PRESQ'ILE",
                                    "enum": [
                                        "PRQ"
                                    ]
                                },
                                {
                                    "title": "PRE",
                                    "enum": [
                                        "PRE"
                                    ]
                                },
                                {
                                    "title": "ROUTE",
                                    "enum": [
                                        "RTE."
                                    ]
                                },
                                {
                                    "title": "MONTEE",
                                    "enum": [
                                        "MTE."
                                    ]
                                },
                                {
                                    "title": "ESPLANADE",
                                    "enum": [
                                        "ESP."
                                    ]
                                },
                                {
                                    "title": "PLACE",
                                    "enum": [
                                        "PL."
                                    ]
                                },
                                {
                                    "title": "AVENUE",
                                    "enum": [
                                        "AV."
                                    ]
                                },
                                {
                                    "title": "CHAUSSEE",
                                    "enum": [
                                        "CHS."
                                    ]
                                },
                                {
                                    "title": "CITE",
                                    "enum": [
                                        "CITE"
                                    ]
                                },
                                {
                                    "title": "ALLEE",
                                    "enum": [
                                        "ALL."
                                    ]
                                },
                                {
                                    "title": "ZONE",
                                    "enum": [
                                        "ZONE"
                                    ]
                                },
                                {
                                    "title": "IMPASSE",
                                    "enum": [
                                        "IMP."
                                    ]
                                },
                                {
                                    "title": "CENTRE",
                                    "enum": [
                                        "CTR."
                                    ]
                                },
                                {
                                    "title": "ROND-POINT",
                                    "enum": [
                                        "R-P."
                                    ]
                                },
                                {
                                    "title": "CHEMIN",
                                    "enum": [
                                        "CHE."
                                    ]
                                },
                                {
                                    "title": "DOMAINE",
                                    "enum": [
                                        "DOM."
                                    ]
                                },
                                {
                                    "title": "SQUARE",
                                    "enum": [
                                        "SQ."
                                    ]
                                },
                                {
                                    "title": "BOULEVARD",
                                    "enum": [
                                        "BD."
                                    ]
                                },
                                {
                                    "title": "RESIDENCE",
                                    "enum": [
                                        "RES."
                                    ]
                                },
                                {
                                    "title": "AUTOROUTE",
                                    "enum": [
                                        "ATR."
                                    ]
                                },
                                {
                                    "title": "COTE",
                                    "enum": [
                                        "COTE"
                                    ]
                                },
                                {
                                    "title": "SENTIER",
                                    "enum": [
                                        "SEN."
                                    ]
                                },
                                {
                                    "title": "PLATEAU",
                                    "enum": [
                                        "PLT."
                                    ]
                                },
                                {
                                    "title": "PASSAGE",
                                    "enum": [
                                        "PAS."
                                    ]
                                },
                                {
                                    "title": "QUAI",
                                    "enum": [
                                        "QUAI"
                                    ]
                                },
                                {
                                    "title": "QUARTIER",
                                    "enum": [
                                        "QUA."
                                    ]
                                },
                                {
                                    "title": "RUELLE",
                                    "enum": [
                                        "RLE."
                                    ]
                                },
                                {
                                    "title": "MAISON",
                                    "enum": [
                                        "MSN."
                                    ]
                                },
                                {
                                    "title": "MARCHE",
                                    "enum": [
                                        "MAR."
                                    ]
                                },
                                {
                                    "title": "CEINTURE",
                                    "enum": [
                                        "CTE."
                                    ]
                                },
                                {
                                    "title": "PORTE",
                                    "enum": [
                                        "PTE."
                                    ]
                                },
                                {
                                    "title": "CIRCUIT",
                                    "enum": [
                                        "CIR."
                                    ]
                                },
                                {
                                    "title": "RAVIN",
                                    "enum": [
                                        "RAV."
                                    ]
                                },
                                {
                                    "title": "RUE",
                                    "enum": [
                                        "RUE"
                                    ]
                                },
                                {
                                    "title": "Impasse",
                                    "enum": [
                                        "IMPASSE"
                                    ]
                                },
                                {
                                    "title": "3ª Travessa",
                                    "enum": [
                                        "3TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Canelha",
                                    "enum": [
                                        "CANELHA"
                                    ]
                                },
                                {
                                    "title": "6º Beco",
                                    "enum": [
                                        "6BECO"
                                    ]
                                },
                                {
                                    "title": "Miradouro",
                                    "enum": [
                                        "MIRADOURO"
                                    ]
                                },
                                {
                                    "title": "5º Beco",
                                    "enum": [
                                        "5BECO"
                                    ]
                                },
                                {
                                    "title": "4º Beco",
                                    "enum": [
                                        "4BECO"
                                    ]
                                },
                                {
                                    "title": "Prolongamento",
                                    "enum": [
                                        "PROLONGAME"
                                    ]
                                },
                                {
                                    "title": "7ª Viela",
                                    "enum": [
                                        "7VIELA"
                                    ]
                                },
                                {
                                    "title": "6ª Viela",
                                    "enum": [
                                        "6VIELA"
                                    ]
                                },
                                {
                                    "title": "5ª Viela",
                                    "enum": [
                                        "5VIELA"
                                    ]
                                },
                                {
                                    "title": "4ª Viela",
                                    "enum": [
                                        "4VIELA"
                                    ]
                                },
                                {
                                    "title": "3ª Viela",
                                    "enum": [
                                        "3VIELA"
                                    ]
                                },
                                {
                                    "title": "6ª Travessa",
                                    "enum": [
                                        "6TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "5ª Travessa",
                                    "enum": [
                                        "5TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "4ª Travessa",
                                    "enum": [
                                        "4TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Volta",
                                    "enum": [
                                        "VOLTA"
                                    ]
                                },
                                {
                                    "title": "Couraça",
                                    "enum": [
                                        "COURACA"
                                    ]
                                },
                                {
                                    "title": "Canada",
                                    "enum": [
                                        "CANADA"
                                    ]
                                },
                                {
                                    "title": "Aceiro",
                                    "enum": [
                                        "ACEIRO"
                                    ]
                                },
                                {
                                    "title": "Subida",
                                    "enum": [
                                        "SUBIDA"
                                    ]
                                },
                                {
                                    "title": "Parada",
                                    "enum": [
                                        "PARADA"
                                    ]
                                },
                                {
                                    "title": "Hemiciclo",
                                    "enum": [
                                        "HEMICICLO"
                                    ]
                                },
                                {
                                    "title": "Carreirinho",
                                    "enum": [
                                        "CARREIRINH"
                                    ]
                                },
                                {
                                    "title": "Viaduto",
                                    "enum": [
                                        "VIADUTO"
                                    ]
                                },
                                {
                                    "title": "Calçadinha",
                                    "enum": [
                                        "CALCADINHA"
                                    ]
                                },
                                {
                                    "title": "Doca",
                                    "enum": [
                                        "DOCA"
                                    ]
                                },
                                {
                                    "title": "Boqueirão",
                                    "enum": [
                                        "BOQUEIRAO"
                                    ]
                                },
                                {
                                    "title": "Regueirão",
                                    "enum": [
                                        "REGUEIRAO"
                                    ]
                                },
                                {
                                    "title": "Campus",
                                    "enum": [
                                        "CAMPUS"
                                    ]
                                },
                                {
                                    "title": "Correnteza",
                                    "enum": [
                                        "CORRENTEZA"
                                    ]
                                },
                                {
                                    "title": "Praça",
                                    "enum": [
                                        "PRACA"
                                    ]
                                },
                                {
                                    "title": "Avenida",
                                    "enum": [
                                        "AVENIDA"
                                    ]
                                },
                                {
                                    "title": "Praceta",
                                    "enum": [
                                        "PRACETA"
                                    ]
                                },
                                {
                                    "title": "Largo",
                                    "enum": [
                                        "LARGO"
                                    ]
                                },
                                {
                                    "title": "Canto",
                                    "enum": [
                                        "CANTO"
                                    ]
                                },
                                {
                                    "title": "Travessa",
                                    "enum": [
                                        "TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Rua",
                                    "enum": [
                                        "RUA"
                                    ]
                                },
                                {
                                    "title": "Beco",
                                    "enum": [
                                        "BECO"
                                    ]
                                },
                                {
                                    "title": "Passeio",
                                    "enum": [
                                        "PASSEIO"
                                    ]
                                },
                                {
                                    "title": "Vereda",
                                    "enum": [
                                        "VEREDA"
                                    ]
                                },
                                {
                                    "title": "2ª Travessa",
                                    "enum": [
                                        "2TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Carreira",
                                    "enum": [
                                        "CARREIRA"
                                    ]
                                },
                                {
                                    "title": "1ª Travessa",
                                    "enum": [
                                        "1TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Escadas",
                                    "enum": [
                                        "ESCADAS"
                                    ]
                                },
                                {
                                    "title": "Ligação",
                                    "enum": [
                                        "LIGACAO"
                                    ]
                                },
                                {
                                    "title": "Vila",
                                    "enum": [
                                        "VILA"
                                    ]
                                },
                                {
                                    "title": "Campo",
                                    "enum": [
                                        "CAMPO"
                                    ]
                                },
                                {
                                    "title": "Ponte",
                                    "enum": [
                                        "PONTE"
                                    ]
                                },
                                {
                                    "title": "Chão",
                                    "enum": [
                                        "CHAO"
                                    ]
                                },
                                {
                                    "title": "Gaveto",
                                    "enum": [
                                        "GAVETO"
                                    ]
                                },
                                {
                                    "title": "Marginal",
                                    "enum": [
                                        "MARGINAL"
                                    ]
                                },
                                {
                                    "title": "Azinhaga",
                                    "enum": [
                                        "AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "Esplanada",
                                    "enum": [
                                        "ESPLANADA"
                                    ]
                                },
                                {
                                    "title": "3º Beco",
                                    "enum": [
                                        "3BECO"
                                    ]
                                },
                                {
                                    "title": "1º Beco",
                                    "enum": [
                                        "1BECO"
                                    ]
                                },
                                {
                                    "title": "2º Beco",
                                    "enum": [
                                        "2BECO"
                                    ]
                                },
                                {
                                    "title": "Via",
                                    "enum": [
                                        "VIA"
                                    ]
                                },
                                {
                                    "title": "Transversal",
                                    "enum": [
                                        "TRANSVERSA"
                                    ]
                                },
                                {
                                    "title": "Caminho Municipal",
                                    "enum": [
                                        "CAMINMUNIC"
                                    ]
                                },
                                {
                                    "title": "Loteamento",
                                    "enum": [
                                        "LOTEAMENTO"
                                    ]
                                },
                                {
                                    "title": "Ramal",
                                    "enum": [
                                        "RAMAL"
                                    ]
                                },
                                {
                                    "title": "Arruamento",
                                    "enum": [
                                        "ARRUAMENTO"
                                    ]
                                },
                                {
                                    "title": "Aldeamento",
                                    "enum": [
                                        "ALDEAMENTO"
                                    ]
                                },
                                {
                                    "title": "Estrada Regional",
                                    "enum": [
                                        "ESTRAREGIO"
                                    ]
                                },
                                {
                                    "title": "2ª Rua",
                                    "enum": [
                                        "2RUA"
                                    ]
                                },
                                {
                                    "title": "1ª Rua",
                                    "enum": [
                                        "1RUA"
                                    ]
                                },
                                {
                                    "title": "3ª Rua",
                                    "enum": [
                                        "3RUA"
                                    ]
                                },
                                {
                                    "title": "Itinerário Principal",
                                    "enum": [
                                        "ITINEPRINC"
                                    ]
                                },
                                {
                                    "title": "Terreirinho",
                                    "enum": [
                                        "TERREIRINH"
                                    ]
                                },
                                {
                                    "title": "Jardim",
                                    "enum": [
                                        "JARDIM"
                                    ]
                                },
                                {
                                    "title": "Corredor",
                                    "enum": [
                                        "CORREDOR"
                                    ]
                                },
                                {
                                    "title": "Rossio",
                                    "enum": [
                                        "ROSSIO"
                                    ]
                                },
                                {
                                    "title": "Terreiro",
                                    "enum": [
                                        "TERREIRO"
                                    ]
                                },
                                {
                                    "title": "Cerca",
                                    "enum": [
                                        "CERCA"
                                    ]
                                },
                                {
                                    "title": "Ruela",
                                    "enum": [
                                        "RUELA"
                                    ]
                                },
                                {
                                    "title": "Cangosta",
                                    "enum": [
                                        "CANGOSTA"
                                    ]
                                },
                                {
                                    "title": "Quelha",
                                    "enum": [
                                        "QUELHA"
                                    ]
                                },
                                {
                                    "title": "Escadaria",
                                    "enum": [
                                        "ESCADARIA"
                                    ]
                                },
                                {
                                    "title": "Travessinha",
                                    "enum": [
                                        "TRAVESSINH"
                                    ]
                                },
                                {
                                    "title": "Encosta",
                                    "enum": [
                                        "ENCOSTA"
                                    ]
                                },
                                {
                                    "title": "Recanto",
                                    "enum": [
                                        "RECANTO"
                                    ]
                                },
                                {
                                    "title": "Circular",
                                    "enum": [
                                        "CIRCULAR"
                                    ]
                                },
                                {
                                    "title": "Quelho",
                                    "enum": [
                                        "QUELHO"
                                    ]
                                },
                                {
                                    "title": "Recta",
                                    "enum": [
                                        "RECTA"
                                    ]
                                },
                                {
                                    "title": "Rampinha",
                                    "enum": [
                                        "RAMPINHA"
                                    ]
                                },
                                {
                                    "title": "Larguinho",
                                    "enum": [
                                        "LARGUINHO"
                                    ]
                                },
                                {
                                    "title": "Caleja",
                                    "enum": [
                                        "CALEJA"
                                    ]
                                },
                                {
                                    "title": "6ª Transversal",
                                    "enum": [
                                        "6TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "5ª Transversal",
                                    "enum": [
                                        "5TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "4ª Transversal",
                                    "enum": [
                                        "4TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "3ª Transversal",
                                    "enum": [
                                        "3TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "2ª Transversal",
                                    "enum": [
                                        "2TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "1ª Transversal",
                                    "enum": [
                                        "1TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "Tapada",
                                    "enum": [
                                        "TAPADA"
                                    ]
                                },
                                {
                                    "title": "Escada",
                                    "enum": [
                                        "ESCADA"
                                    ]
                                },
                                {
                                    "title": "Carreirinha",
                                    "enum": [
                                        "CARREIRINH"
                                    ]
                                },
                                {
                                    "title": "Descida",
                                    "enum": [
                                        "DESCIDA"
                                    ]
                                },
                                {
                                    "title": "Corredoura",
                                    "enum": [
                                        "CORREDOURA"
                                    ]
                                },
                                {
                                    "title": "Entrada",
                                    "enum": [
                                        "ENTRADA"
                                    ]
                                },
                                {
                                    "title": "Ladeirinha",
                                    "enum": [
                                        "LADEIRINHA"
                                    ]
                                },
                                {
                                    "title": "2º Largo",
                                    "enum": [
                                        "2LARGO"
                                    ]
                                },
                                {
                                    "title": "1º Largo",
                                    "enum": [
                                        "1LARGO"
                                    ]
                                },
                                {
                                    "title": "Estradão",
                                    "enum": [
                                        "ESTRADAO"
                                    ]
                                },
                                {
                                    "title": "Circunvalação",
                                    "enum": [
                                        "CIRCUNVALA"
                                    ]
                                },
                                {
                                    "title": "1º Canto",
                                    "enum": [
                                        "1CANTO"
                                    ]
                                },
                                {
                                    "title": "3ª Azinhaga",
                                    "enum": [
                                        "3AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "4ª Azinhaga",
                                    "enum": [
                                        "4AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "Revelim",
                                    "enum": [
                                        "REVELIM"
                                    ]
                                },
                                {
                                    "title": "2ª Azinhaga",
                                    "enum": [
                                        "2AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "2ª Subida",
                                    "enum": [
                                        "2SUBIDA"
                                    ]
                                },
                                {
                                    "title": "1ª Subida",
                                    "enum": [
                                        "1SUBIDA"
                                    ]
                                },
                                {
                                    "title": "4º Impasse",
                                    "enum": [
                                        "4IMPASSE"
                                    ]
                                },
                                {
                                    "title": "7ª Vereda",
                                    "enum": [
                                        "7VEREDA"
                                    ]
                                },
                                {
                                    "title": "6ª Vereda",
                                    "enum": [
                                        "6VEREDA"
                                    ]
                                },
                                {
                                    "title": "5ª Vereda",
                                    "enum": [
                                        "5VEREDA"
                                    ]
                                },
                                {
                                    "title": "3º Impasse",
                                    "enum": [
                                        "3IMPASSE"
                                    ]
                                },
                                {
                                    "title": "4ª Vereda",
                                    "enum": [
                                        "4VEREDA"
                                    ]
                                },
                                {
                                    "title": "1º Impasse",
                                    "enum": [
                                        "1IMPASSE"
                                    ]
                                },
                                {
                                    "title": "2º Impasse",
                                    "enum": [
                                        "2IMPASSE"
                                    ]
                                },
                                {
                                    "title": "3ª Vereda",
                                    "enum": [
                                        "3VEREDA"
                                    ]
                                },
                                {
                                    "title": "2ª Vereda",
                                    "enum": [
                                        "2VEREDA"
                                    ]
                                },
                                {
                                    "title": "1ª Vereda",
                                    "enum": [
                                        "1VEREDA"
                                    ]
                                },
                                {
                                    "title": "Levada",
                                    "enum": [
                                        "LEVADA"
                                    ]
                                },
                                {
                                    "title": "3ª Canada",
                                    "enum": [
                                        "3CANADA"
                                    ]
                                },
                                {
                                    "title": "2ª Canada",
                                    "enum": [
                                        "2CANADA"
                                    ]
                                },
                                {
                                    "title": "1ª Canada",
                                    "enum": [
                                        "1CANADA"
                                    ]
                                },
                                {
                                    "title": "Grota",
                                    "enum": [
                                        "GROTA"
                                    ]
                                },
                                {
                                    "title": "2ª Viela",
                                    "enum": [
                                        "2VIELA"
                                    ]
                                },
                                {
                                    "title": "1ª Viela",
                                    "enum": [
                                        "1VIELA"
                                    ]
                                },
                                {
                                    "title": "Acesso",
                                    "enum": [
                                        "ACESSO"
                                    ]
                                },
                                {
                                    "title": "Arco",
                                    "enum": [
                                        "ARCO"
                                    ]
                                },
                                {
                                    "title": "Ilha",
                                    "enum": [
                                        "ILHA"
                                    ]
                                },
                                {
                                    "title": "Cais",
                                    "enum": [
                                        "CAIS"
                                    ]
                                },
                                {
                                    "title": "Carreiro",
                                    "enum": [
                                        "CARREIRO"
                                    ]
                                },
                                {
                                    "title": "Ladeira",
                                    "enum": [
                                        "LADEIRA"
                                    ]
                                },
                                {
                                    "title": "Casal",
                                    "enum": [
                                        "CASAL"
                                    ]
                                },
                                {
                                    "title": "Alto",
                                    "enum": [
                                        "ALTO"
                                    ]
                                },
                                {
                                    "title": "Estrada Municipal",
                                    "enum": [
                                        "ESTRAMUNIC"
                                    ]
                                },
                                {
                                    "title": "Variante",
                                    "enum": [
                                        "VARIANTE"
                                    ]
                                },
                                {
                                    "title": "Itinerário Complementar",
                                    "enum": [
                                        "ITINECOMPL"
                                    ]
                                },
                                {
                                    "title": "Rotunda",
                                    "enum": [
                                        "ROTUNDA"
                                    ]
                                },
                                {
                                    "title": "Auto-Estrada",
                                    "enum": [
                                        "AUTOESTRAD"
                                    ]
                                },
                                {
                                    "title": "Zona",
                                    "enum": [
                                        "ZONA"
                                    ]
                                },
                                {
                                    "title": "Pátio",
                                    "enum": [
                                        "PATIO"
                                    ]
                                },
                                {
                                    "title": "Calçada",
                                    "enum": [
                                        "CALCADA"
                                    ]
                                },
                                {
                                    "title": "Alameda",
                                    "enum": [
                                        "ALAMEDA"
                                    ]
                                },
                                {
                                    "title": "Quinta",
                                    "enum": [
                                        "QUINTA"
                                    ]
                                },
                                {
                                    "title": "Parque",
                                    "enum": [
                                        "PARQUE"
                                    ]
                                },
                                {
                                    "title": "Adro",
                                    "enum": [
                                        "ADRO"
                                    ]
                                },
                                {
                                    "title": "Rampa",
                                    "enum": [
                                        "RAMPA"
                                    ]
                                },
                                {
                                    "title": "Cantinho",
                                    "enum": [
                                        "CANTINHO"
                                    ]
                                },
                                {
                                    "title": "Estrada",
                                    "enum": [
                                        "ESTRADA"
                                    ]
                                },
                                {
                                    "title": "Caminho",
                                    "enum": [
                                        "CAMINHO"
                                    ]
                                },
                                {
                                    "title": "Bairro",
                                    "enum": [
                                        "BAIRRO"
                                    ]
                                },
                                {
                                    "title": "Estrada Nacional",
                                    "enum": [
                                        "ESTRANACIO"
                                    ]
                                },
                                {
                                    "title": "Urbanização",
                                    "enum": [
                                        "URBANIZACA"
                                    ]
                                },
                                {
                                    "title": "Escadinhas",
                                    "enum": [
                                        "ESCADINHAS"
                                    ]
                                },
                                {
                                    "title": "Viela",
                                    "enum": [
                                        "VIELA"
                                    ]
                                },
                                {
                                    "title": "Drum",
                                    "enum": [
                                        "Drum"
                                    ]
                                },
                                {
                                    "title": "Fundac",
                                    "enum": [
                                        "Fundac"
                                    ]
                                },
                                {
                                    "title": "Colonie",
                                    "enum": [
                                        "Colonie"
                                    ]
                                },
                                {
                                    "title": "Cartier",
                                    "enum": [
                                        "Cartier"
                                    ]
                                },
                                {
                                    "title": "Canal",
                                    "enum": [
                                        "Canal"
                                    ]
                                },
                                {
                                    "title": "Cale",
                                    "enum": [
                                        "Cale"
                                    ]
                                },
                                {
                                    "title": "Bulevard",
                                    "enum": [
                                        "Bulevard"
                                    ]
                                },
                                {
                                    "title": "Alee VII",
                                    "enum": [
                                        "Alee VII"
                                    ]
                                },
                                {
                                    "title": "Alee VI",
                                    "enum": [
                                        "Alee VI"
                                    ]
                                },
                                {
                                    "title": "Alee V",
                                    "enum": [
                                        "Alee V"
                                    ]
                                },
                                {
                                    "title": "Alee IV",
                                    "enum": [
                                        "Alee IV"
                                    ]
                                },
                                {
                                    "title": "Alee III",
                                    "enum": [
                                        "Alee III"
                                    ]
                                },
                                {
                                    "title": "Alee II",
                                    "enum": [
                                        "Alee II"
                                    ]
                                },
                                {
                                    "title": "Alee I",
                                    "enum": [
                                        "Alee I"
                                    ]
                                },
                                {
                                    "title": "Alee",
                                    "enum": [
                                        "Alee"
                                    ]
                                },
                                {
                                    "title": "Vad",
                                    "enum": [
                                        "Vad"
                                    ]
                                },
                                {
                                    "title": "Trecatoare",
                                    "enum": [
                                        "Trecatoare"
                                    ]
                                },
                                {
                                    "title": "Pod",
                                    "enum": [
                                        "Pod"
                                    ]
                                },
                                {
                                    "title": "Cvartal",
                                    "enum": [
                                        "Cvartal"
                                    ]
                                },
                                {
                                    "title": "Canton",
                                    "enum": [
                                        "Canton"
                                    ]
                                },
                                {
                                    "title": "Camp",
                                    "enum": [
                                        "Camp"
                                    ]
                                },
                                {
                                    "title": "Alee VIII",
                                    "enum": [
                                        "Alee VIII"
                                    ]
                                },
                                {
                                    "title": "Zona",
                                    "enum": [
                                        "Zona"
                                    ]
                                },
                                {
                                    "title": "Varianta",
                                    "enum": [
                                        "Varianta"
                                    ]
                                },
                                {
                                    "title": "Uz intern",
                                    "enum": [
                                        "Uz intern"
                                    ]
                                },
                                {
                                    "title": "Ulita",
                                    "enum": [
                                        "Ulita"
                                    ]
                                },
                                {
                                    "title": "Trecere",
                                    "enum": [
                                        "Trecere"
                                    ]
                                },
                                {
                                    "title": "Suis",
                                    "enum": [
                                        "Suis"
                                    ]
                                },
                                {
                                    "title": "Stradela",
                                    "enum": [
                                        "Stradela"
                                    ]
                                },
                                {
                                    "title": "Strada",
                                    "enum": [
                                        "Strada"
                                    ]
                                },
                                {
                                    "title": "Statia",
                                    "enum": [
                                        "Statia"
                                    ]
                                },
                                {
                                    "title": "Splai",
                                    "enum": [
                                        "Splai"
                                    ]
                                },
                                {
                                    "title": "Sosea",
                                    "enum": [
                                        "Sosea"
                                    ]
                                },
                                {
                                    "title": "Sir",
                                    "enum": [
                                        "Sir"
                                    ]
                                },
                                {
                                    "title": "Scuar",
                                    "enum": [
                                        "Scuar"
                                    ]
                                },
                                {
                                    "title": "Rampa",
                                    "enum": [
                                        "Rampa"
                                    ]
                                },
                                {
                                    "title": "Prelungire",
                                    "enum": [
                                        "Prelungire"
                                    ]
                                },
                                {
                                    "title": "Poteca",
                                    "enum": [
                                        "Poteca"
                                    ]
                                },
                                {
                                    "title": "Poligon",
                                    "enum": [
                                        "Poligon"
                                    ]
                                },
                                {
                                    "title": "Platou",
                                    "enum": [
                                        "Platou"
                                    ]
                                },
                                {
                                    "title": "Pietonal",
                                    "enum": [
                                        "Pietonal"
                                    ]
                                },
                                {
                                    "title": "Piata",
                                    "enum": [
                                        "Piata"
                                    ]
                                },
                                {
                                    "title": "Pasaj",
                                    "enum": [
                                        "Pasaj"
                                    ]
                                },
                                {
                                    "title": "Parc",
                                    "enum": [
                                        "Parc"
                                    ]
                                },
                                {
                                    "title": "Intrare",
                                    "enum": [
                                        "Intrare"
                                    ]
                                },
                                {
                                    "title": "Hotar",
                                    "enum": [
                                        "Hotar"
                                    ]
                                },
                                {
                                    "title": "Fundatura",
                                    "enum": [
                                        "Fundatura"
                                    ]
                                },
                                {
                                    "title": "Curte",
                                    "enum": [
                                        "Curte"
                                    ]
                                }
                            ],
                            "type": "string"
                        },
                        "postal_address:g_p_s_longitude": {
                            "maximum": 99999.99999999999999999999E0,
                            "type": "number"
                        },
                        "postal_address:confidential": {
                            "type": "boolean"
                        },
                        "postal_address:invalid": {
                            "type": "boolean"
                        },
                        "postal_address:postal_code": {
                            "type": "string",
                            "maxLength": 10
                        },
                        "postal_address:anonymous": {
                            "type": "boolean"
                        },
                        "postal_address:city_code": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:street_name": {
                            "type": "string",
                            "maxLength": 160
                        },
                        "postal_address:tax_address": {
                            "type": "boolean"
                        },
                        "postal_address:address_category": {
                            "type": "string",
                            "maxLength": 30
                        },
                        "postal_address:preferred": {
                            "type": "boolean"
                        },
                        "postal_address:addressee_name": {
                            "type": "string",
                            "maxLength": 80
                        },
                        "postal_address:geographical_zone_name": {
                            "type": "string",
                            "maxLength": 30
                        },
                        "postal_address:country_code": {
                            "type": "string",
                            "maxLength": 2
                        },
                        "postal_address:local_name": {
                            "type": "string",
                            "maxLength": 80
                        }
                    }
                },
                "curies": [
                    {
                        "templated": "true",
                        "name": "cscrel",
                        "href": "/rel/{rel}"
                    }
                ],
                "method": "POST",
                "rel": "create",
                "mediaType": "application/json",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
                "title": "Create a Postal Address",
                "type": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressCollection",
                "cscrel:item-type": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressDocument"
            }
        ],
        "title": "Postal Address collection interactions",
        "properties": {
            "oneOf": [
                {
                    "_count": {
                        "pattern": "^\\\\[0-9]+\\\\+$",
                        "type": "string"
                    }
                },
                {
                    "_count": {
                        "type": "integer"
                    }
                }
            ],
            "_links": {
                "type": "object",
                "properties": {
                    "item": {
                        "type": "object",
                        "properties": {
                            "summary": {
                                "type": "object",
                                "properties": {
                                    "postal_address:preferred": {
                                        "type": "boolean"
                                    },
                                    "postal_address:city_name": {
                                        "type": "string",
                                        "maxLength": 70
                                    },
                                    "postal_address:format_type": {
                                        "oneOf": [
                                            {
                                                "description": "language:en-GB",
                                                "title": "PO Box",
                                                "enum": [
                                                    "po_box"
                                                ]
                                            },
                                            {
                                                "description": "language:en-GB",
                                                "title": "Postal Address",
                                                "enum": [
                                                    "postal_address"
                                                ]
                                            }
                                        ],
                                        "type": "string"
                                    },
                                    "postal_address:confidential": {
                                        "type": "boolean"
                                    },
                                    "postal_address:country_code": {
                                        "type": "string",
                                        "maxLength": 2
                                    },
                                    "postal_address:tax_address": {
                                        "type": "boolean"
                                    },
                                    "postal_address:postal_code": {
                                        "type": "string",
                                        "maxLength": 10
                                    },
                                    "postal_address:display_id": {
                                        "type": "string",
                                        "maxLength": 75
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const dataWithoutItems = {
    "_count": 0,
    "_links": {

        "self": {
            "name": "Postal Address",
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
            "title": "Postal Address"
        },
        "up": {
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D"
        },
        "cscrel:item-type": {
            "href": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressDocument"
        },
        "type": [
            {
                "href": "http://20.33.40.147:13111/csc/insurance/schemas/system/factory"
            },
            {
                "href": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressCollection"
            }
        ],
        "first": {
            "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses?_num=20"
        }
    },
    "_options": {
        "links": [
            {
                "schema": {
                    "properties": {
                        "_count": {
                            "type": "integer",
                            "minimum": 500
                        },
                        "_start": {
                            "type": "integer",
                            "minimum": 0
                        },
                        "_embed": {
                            "oneOf": [
                                {
                                    "const": "none"
                                },
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            ]
                        },
                        "_options": {
                            "type": "boolean"
                        },
                        "_num": {
                            "type": "integer",
                            "minimum": 20
                        },
                        "_sort": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                },
                "method": "GET",
                "rel": "search",
                "mediaType": "application/vnd.hal+json",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
                "title": "Search for a Postal Address  by criteria"
            },
            {
                "schema": {
                    "type": "object",
                    "properties": {
                        "postal_address:street_number": {
                            "type": "string",
                            "maxLength": 15
                        },
                        "postal_address:residence_line": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:city_name": {
                            "type": "string",
                            "maxLength": 70
                        },
                        "postal_address:master_mode": {
                            "type": "boolean"
                        },
                        "postal_address:i_n_s_e_e_code": {
                            "type": "string",
                            "maxLength": 5
                        },
                        "postal_address:p_o_box": {
                            "type": "string",
                            "maxLength": 28
                        },
                        "postal_address:additional_info": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:type": {
                            "oneOf": [
                                {
                                    "description": "language:en-GB",
                                    "title": "Primary",
                                    "enum": [
                                        "primary"
                                    ]
                                },
                                {
                                    "description": "language:en-GB",
                                    "title": "Secondary",
                                    "enum": [
                                        "secondary"
                                    ]
                                }
                            ],
                            "type": "string"
                        },
                        "postal_address:g_p_s_latitude": {
                            "maximum": 99999.99999999999999999999E0,
                            "type": "number"
                        },
                        "postal_address:office_distributor": {
                            "type": "string",
                            "maxLength": 60
                        },
                        "postal_address:district_line": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:street_line": {
                            "type": "string",
                            "maxLength": 160
                        },
                        "postal_address:street_type": {
                            "oneOf": [
                                {
                                    "title": "CALLE",
                                    "enum": [
                                        "calle"
                                    ]
                                },
                                {
                                    "title": "FOYER",
                                    "enum": [
                                        "FOYR"
                                    ]
                                },
                                {
                                    "title": "FOSSE",
                                    "enum": [
                                        "FOS"
                                    ]
                                },
                                {
                                    "title": "FORUM",
                                    "enum": [
                                        "FORM"
                                    ]
                                },
                                {
                                    "title": "FORT",
                                    "enum": [
                                        "FORT"
                                    ]
                                },
                                {
                                    "title": "FONTAINE",
                                    "enum": [
                                        "FON"
                                    ]
                                },
                                {
                                    "title": "FERME",
                                    "enum": [
                                        "FRM"
                                    ]
                                },
                                {
                                    "title": "FAUBOURG",
                                    "enum": [
                                        "FG"
                                    ]
                                },
                                {
                                    "title": "ETANG",
                                    "enum": [
                                        "ETNG"
                                    ]
                                },
                                {
                                    "title": "ESPLANADE",
                                    "enum": [
                                        "ESP"
                                    ]
                                },
                                {
                                    "title": "ESPACE",
                                    "enum": [
                                        "ESPA"
                                    ]
                                },
                                {
                                    "title": "ESCALIER",
                                    "enum": [
                                        "ESC"
                                    ]
                                },
                                {
                                    "title": "ENCLOS",
                                    "enum": [
                                        "ENC"
                                    ]
                                },
                                {
                                    "title": "ENCLAVE",
                                    "enum": [
                                        "ENV"
                                    ]
                                },
                                {
                                    "title": "ENCEINTE",
                                    "enum": [
                                        "EN"
                                    ]
                                },
                                {
                                    "title": "EGLISE",
                                    "enum": [
                                        "EGL"
                                    ]
                                },
                                {
                                    "title": "ECLUSE",
                                    "enum": [
                                        "ECL"
                                    ]
                                },
                                {
                                    "title": "DOMAINE",
                                    "enum": [
                                        "DOM"
                                    ]
                                },
                                {
                                    "title": "DIGUE",
                                    "enum": [
                                        "DIG"
                                    ]
                                },
                                {
                                    "title": "DESCENTE",
                                    "enum": [
                                        "DSC"
                                    ]
                                },
                                {
                                    "title": "DEGRE",
                                    "enum": [
                                        "DEG"
                                    ]
                                },
                                {
                                    "title": "DARSE",
                                    "enum": [
                                        "DARS"
                                    ]
                                },
                                {
                                    "title": "COURS",
                                    "enum": [
                                        "CRS"
                                    ]
                                },
                                {
                                    "title": "COUR",
                                    "enum": [
                                        "COUR"
                                    ]
                                },
                                {
                                    "title": "COTTAGE",
                                    "enum": [
                                        "COTT"
                                    ]
                                },
                                {
                                    "title": "COTE",
                                    "enum": [
                                        "COTE"
                                    ]
                                },
                                {
                                    "title": "CORNICHE",
                                    "enum": [
                                        "COR"
                                    ]
                                },
                                {
                                    "title": "CONTOUR",
                                    "enum": [
                                        "CTR"
                                    ]
                                },
                                {
                                    "title": "COLLINE",
                                    "enum": [
                                        "COLI"
                                    ]
                                },
                                {
                                    "title": "COL",
                                    "enum": [
                                        "COL"
                                    ]
                                },
                                {
                                    "title": "CLOS",
                                    "enum": [
                                        "CLOS"
                                    ]
                                },
                                {
                                    "title": "CLOITRE",
                                    "enum": [
                                        "CLOI"
                                    ]
                                },
                                {
                                    "title": "CITE",
                                    "enum": [
                                        "CITE"
                                    ]
                                },
                                {
                                    "title": "CHEZ",
                                    "enum": [
                                        "CHEZ"
                                    ]
                                },
                                {
                                    "title": "CHEMINEMENT",
                                    "enum": [
                                        "CHEM"
                                    ]
                                },
                                {
                                    "title": "CHEMIN VICINAL",
                                    "enum": [
                                        "CHV"
                                    ]
                                },
                                {
                                    "title": "CHEMIN",
                                    "enum": [
                                        "CHE"
                                    ]
                                },
                                {
                                    "title": "CHAUSSEE",
                                    "enum": [
                                        "CHS"
                                    ]
                                },
                                {
                                    "title": "CHATEAU",
                                    "enum": [
                                        "CHT"
                                    ]
                                },
                                {
                                    "title": "CHARMILLE",
                                    "enum": [
                                        "CHI"
                                    ]
                                },
                                {
                                    "title": "CHAPELLE",
                                    "enum": [
                                        "CHP"
                                    ]
                                },
                                {
                                    "title": "CHALET",
                                    "enum": [
                                        "CHL"
                                    ]
                                },
                                {
                                    "title": "CENTRE COMMERCIAL",
                                    "enum": [
                                        "CCAL"
                                    ]
                                },
                                {
                                    "title": "CENTRE",
                                    "enum": [
                                        "CTRE"
                                    ]
                                },
                                {
                                    "title": "CAVEE",
                                    "enum": [
                                        "CAV"
                                    ]
                                },
                                {
                                    "title": "CASTEL",
                                    "enum": [
                                        "CST"
                                    ]
                                },
                                {
                                    "title": "CARRIERE",
                                    "enum": [
                                        "CARE"
                                    ]
                                },
                                {
                                    "title": "CARREFOUR",
                                    "enum": [
                                        "CAR"
                                    ]
                                },
                                {
                                    "title": "CARREAU",
                                    "enum": [
                                        "CAU"
                                    ]
                                },
                                {
                                    "title": "CARRE",
                                    "enum": [
                                        "CARR"
                                    ]
                                },
                                {
                                    "title": "CAMPING",
                                    "enum": [
                                        "CPG"
                                    ]
                                },
                                {
                                    "title": "CAMPAGNE",
                                    "enum": [
                                        "CGNE"
                                    ]
                                },
                                {
                                    "title": "CAMP",
                                    "enum": [
                                        "CAMP"
                                    ]
                                },
                                {
                                    "title": "CALE",
                                    "enum": [
                                        "CALE"
                                    ]
                                },
                                {
                                    "title": "POURTOUR",
                                    "enum": [
                                        "POUR"
                                    ]
                                },
                                {
                                    "title": "POTERNE",
                                    "enum": [
                                        "POT"
                                    ]
                                },
                                {
                                    "title": "PORTIQUE",
                                    "enum": [
                                        "PORQ"
                                    ]
                                },
                                {
                                    "title": "PORTE",
                                    "enum": [
                                        "PTE"
                                    ]
                                },
                                {
                                    "title": "PORT",
                                    "enum": [
                                        "PORT"
                                    ]
                                },
                                {
                                    "title": "PONT",
                                    "enum": [
                                        "PONT"
                                    ]
                                },
                                {
                                    "title": "POINTE",
                                    "enum": [
                                        "PNT"
                                    ]
                                },
                                {
                                    "title": "PLATEAU",
                                    "enum": [
                                        "PLT"
                                    ]
                                },
                                {
                                    "title": "PLAN",
                                    "enum": [
                                        "PLAN"
                                    ]
                                },
                                {
                                    "title": "PLAINE",
                                    "enum": [
                                        "PLN"
                                    ]
                                },
                                {
                                    "title": "PLAGE",
                                    "enum": [
                                        "PLAG"
                                    ]
                                },
                                {
                                    "title": "PLACIS",
                                    "enum": [
                                        "PLCI"
                                    ]
                                },
                                {
                                    "title": "PLACE",
                                    "enum": [
                                        "PL"
                                    ]
                                },
                                {
                                    "title": "PETITE ALLEE",
                                    "enum": [
                                        "PTA"
                                    ]
                                },
                                {
                                    "title": "PETITE RUE",
                                    "enum": [
                                        "PTR"
                                    ]
                                },
                                {
                                    "title": "PETITE ROUTE",
                                    "enum": [
                                        "PRT"
                                    ]
                                },
                                {
                                    "title": "PETITE IMPASSE",
                                    "enum": [
                                        "PIM"
                                    ]
                                },
                                {
                                    "title": "PETITE AVENUE",
                                    "enum": [
                                        "PAE"
                                    ]
                                },
                                {
                                    "title": "PETIT CHEMIN",
                                    "enum": [
                                        "PCH"
                                    ]
                                },
                                {
                                    "title": "PERISTYLE",
                                    "enum": [
                                        "PSTY"
                                    ]
                                },
                                {
                                    "title": "PERIPHERIQUE",
                                    "enum": [
                                        "PERI"
                                    ]
                                },
                                {
                                    "title": "PAVILLON",
                                    "enum": [
                                        "PAV"
                                    ]
                                },
                                {
                                    "title": "PATIO",
                                    "enum": [
                                        "PAT"
                                    ]
                                },
                                {
                                    "title": "PASSERELLE",
                                    "enum": [
                                        "PLE"
                                    ]
                                },
                                {
                                    "title": "PASSE",
                                    "enum": [
                                        "PASS"
                                    ]
                                },
                                {
                                    "title": "PASSAGE A NIVEAU",
                                    "enum": [
                                        "PN"
                                    ]
                                },
                                {
                                    "title": "PASSAGE",
                                    "enum": [
                                        "PAS"
                                    ]
                                },
                                {
                                    "title": "PARVIS",
                                    "enum": [
                                        "PRV"
                                    ]
                                },
                                {
                                    "title": "PARKING",
                                    "enum": [
                                        "PKG"
                                    ]
                                },
                                {
                                    "title": "PARC",
                                    "enum": [
                                        "PARC"
                                    ]
                                },
                                {
                                    "title": "PALAIS",
                                    "enum": [
                                        "PAL"
                                    ]
                                },
                                {
                                    "title": "NOUVELLE ROUTE",
                                    "enum": [
                                        "NTE"
                                    ]
                                },
                                {
                                    "title": "MUSEE",
                                    "enum": [
                                        "MUS"
                                    ]
                                },
                                {
                                    "title": "MOULIN",
                                    "enum": [
                                        "MLN"
                                    ]
                                },
                                {
                                    "title": "MONTEE",
                                    "enum": [
                                        "MTE"
                                    ]
                                },
                                {
                                    "title": "METRO",
                                    "enum": [
                                        "MET"
                                    ]
                                },
                                {
                                    "title": "MAS",
                                    "enum": [
                                        "MAS"
                                    ]
                                },
                                {
                                    "title": "MARCHE",
                                    "enum": [
                                        "MAR"
                                    ]
                                },
                                {
                                    "title": "MANOIR",
                                    "enum": [
                                        "MAN"
                                    ]
                                },
                                {
                                    "title": "MAISON FORESTIERE",
                                    "enum": [
                                        "MF"
                                    ]
                                },
                                {
                                    "title": "MAIL",
                                    "enum": [
                                        "MAIL"
                                    ]
                                },
                                {
                                    "title": "LOTISSEMENT",
                                    "enum": [
                                        "LOT"
                                    ]
                                },
                                {
                                    "title": "LIEU DIT",
                                    "enum": [
                                        "LD"
                                    ]
                                },
                                {
                                    "title": "LEVEE",
                                    "enum": [
                                        "LEVE"
                                    ]
                                },
                                {
                                    "title": "JETEE",
                                    "enum": [
                                        "JTE"
                                    ]
                                },
                                {
                                    "title": "JARDIN",
                                    "enum": [
                                        "JARD"
                                    ]
                                },
                                {
                                    "title": "IMPASSE",
                                    "enum": [
                                        "IMP"
                                    ]
                                },
                                {
                                    "title": "IMMEUBLE",
                                    "enum": [
                                        "IMM"
                                    ]
                                },
                                {
                                    "title": "ILE",
                                    "enum": [
                                        "ILE"
                                    ]
                                },
                                {
                                    "title": "HLM",
                                    "enum": [
                                        "HLM"
                                    ]
                                },
                                {
                                    "title": "HIPPODROME",
                                    "enum": [
                                        "HIP"
                                    ]
                                },
                                {
                                    "title": "HAUT CHEMIN",
                                    "enum": [
                                        "HCH"
                                    ]
                                },
                                {
                                    "title": "HAMEAU",
                                    "enum": [
                                        "HAM"
                                    ]
                                },
                                {
                                    "title": "HALLES",
                                    "enum": [
                                        "HLE"
                                    ]
                                },
                                {
                                    "title": "GROUPEMENT",
                                    "enum": [
                                        "GPT"
                                    ]
                                },
                                {
                                    "title": "GROUPE",
                                    "enum": [
                                        "GPE"
                                    ]
                                },
                                {
                                    "title": "GRIMPETTE",
                                    "enum": [
                                        "GRIM"
                                    ]
                                },
                                {
                                    "title": "GRILLE",
                                    "enum": [
                                        "GRI"
                                    ]
                                },
                                {
                                    "title": "GRAND ENSEMBLE",
                                    "enum": [
                                        "GDEN"
                                    ]
                                },
                                {
                                    "title": "GRANDE RUE",
                                    "enum": [
                                        "GR"
                                    ]
                                },
                                {
                                    "title": "GRAND BOULEVARD",
                                    "enum": [
                                        "GBD"
                                    ]
                                },
                                {
                                    "title": "GARENNE",
                                    "enum": [
                                        "GARN"
                                    ]
                                },
                                {
                                    "title": "GARE",
                                    "enum": [
                                        "GARE"
                                    ]
                                },
                                {
                                    "title": "GALERIE",
                                    "enum": [
                                        "GAL"
                                    ]
                                },
                                {
                                    "title": "BUTTE",
                                    "enum": [
                                        "BUT"
                                    ]
                                },
                                {
                                    "title": "BOURG",
                                    "enum": [
                                        "BRG"
                                    ]
                                },
                                {
                                    "title": "BOULEVARD",
                                    "enum": [
                                        "BD"
                                    ]
                                },
                                {
                                    "title": "BOUCLE",
                                    "enum": [
                                        "BCLE"
                                    ]
                                },
                                {
                                    "title": "BOIS",
                                    "enum": [
                                        "BOIS"
                                    ]
                                },
                                {
                                    "title": "BERGE",
                                    "enum": [
                                        "BER"
                                    ]
                                },
                                {
                                    "title": "BEGUINAGE",
                                    "enum": [
                                        "BEGI"
                                    ]
                                },
                                {
                                    "title": "BASTON",
                                    "enum": [
                                        "BAST"
                                    ]
                                },
                                {
                                    "title": "BASTIDE",
                                    "enum": [
                                        "BSTD"
                                    ]
                                },
                                {
                                    "title": "BAS CHEMIN",
                                    "enum": [
                                        "BCH"
                                    ]
                                },
                                {
                                    "title": "BARRIERE",
                                    "enum": [
                                        "BRE"
                                    ]
                                },
                                {
                                    "title": "AVENUE",
                                    "enum": [
                                        "AV"
                                    ]
                                },
                                {
                                    "title": "AUTOROUTE",
                                    "enum": [
                                        "AUT"
                                    ]
                                },
                                {
                                    "title": "ARCADE",
                                    "enum": [
                                        "ARC"
                                    ]
                                },
                                {
                                    "title": "ANSE",
                                    "enum": [
                                        "ANSE"
                                    ]
                                },
                                {
                                    "title": "ANCIENNE ROUTE",
                                    "enum": [
                                        "ART"
                                    ]
                                },
                                {
                                    "title": "ANCIEN CHEMIN",
                                    "enum": [
                                        "ACH"
                                    ]
                                },
                                {
                                    "title": "ALLEE",
                                    "enum": [
                                        "ALL"
                                    ]
                                },
                                {
                                    "title": "AIRE",
                                    "enum": [
                                        "AIRE"
                                    ]
                                },
                                {
                                    "title": "AGGLOMERATION",
                                    "enum": [
                                        "AGL"
                                    ]
                                },
                                {
                                    "title": "ABBAYE",
                                    "enum": [
                                        "ABE"
                                    ]
                                },
                                {
                                    "title": "ZONE INDUSTRIELLE",
                                    "enum": [
                                        "ZI"
                                    ]
                                },
                                {
                                    "title": "ZONE D'AMENAGEMENT DIFFERE",
                                    "enum": [
                                        "ZAD"
                                    ]
                                },
                                {
                                    "title": "ZONE D'AMENAGEMENT CONCERTE",
                                    "enum": [
                                        "ZAC"
                                    ]
                                },
                                {
                                    "title": "ZONE ARTISANALE",
                                    "enum": [
                                        "ZA"
                                    ]
                                },
                                {
                                    "title": "ZONE A URBANISER EN PRIORITE",
                                    "enum": [
                                        "ZUP"
                                    ]
                                },
                                {
                                    "title": "ZONE",
                                    "enum": [
                                        "ZONE"
                                    ]
                                },
                                {
                                    "title": "VOIE",
                                    "enum": [
                                        "VOI"
                                    ]
                                },
                                {
                                    "title": "VILLAGE",
                                    "enum": [
                                        "VGE"
                                    ]
                                },
                                {
                                    "title": "VILLA",
                                    "enum": [
                                        "VLA"
                                    ]
                                },
                                {
                                    "title": "VIEUX CHEMIN",
                                    "enum": [
                                        "VCHE"
                                    ]
                                },
                                {
                                    "title": "VIEILLE ROUTE",
                                    "enum": [
                                        "VTE"
                                    ]
                                },
                                {
                                    "title": "VIA",
                                    "enum": [
                                        "VIA"
                                    ]
                                },
                                {
                                    "title": "VENELLE",
                                    "enum": [
                                        "VEN"
                                    ]
                                },
                                {
                                    "title": "VAL - VALLEE - VALLON",
                                    "enum": [
                                        "VAL"
                                    ]
                                },
                                {
                                    "title": "TRAVERSE",
                                    "enum": [
                                        "TRA"
                                    ]
                                },
                                {
                                    "title": "TOUR",
                                    "enum": [
                                        "TOUR"
                                    ]
                                },
                                {
                                    "title": "TERTRE",
                                    "enum": [
                                        "TRT"
                                    ]
                                },
                                {
                                    "title": "TERRE PLEIN",
                                    "enum": [
                                        "TPL"
                                    ]
                                },
                                {
                                    "title": "TERRASSE",
                                    "enum": [
                                        "TSSE"
                                    ]
                                },
                                {
                                    "title": "TERRAIN",
                                    "enum": [
                                        "TRN"
                                    ]
                                },
                                {
                                    "title": "TERASSE",
                                    "enum": [
                                        "TER"
                                    ]
                                },
                                {
                                    "title": "STATION",
                                    "enum": [
                                        "STA"
                                    ]
                                },
                                {
                                    "title": "STADE",
                                    "enum": [
                                        "STDE"
                                    ]
                                },
                                {
                                    "title": "SQUARE",
                                    "enum": [
                                        "SQ"
                                    ]
                                },
                                {
                                    "title": "SENTIER",
                                    "enum": [
                                        "SEN"
                                    ]
                                },
                                {
                                    "title": "RUELLE",
                                    "enum": [
                                        "RLE"
                                    ]
                                },
                                {
                                    "title": "RUE",
                                    "enum": [
                                        "R"
                                    ]
                                },
                                {
                                    "title": "ROUTE",
                                    "enum": [
                                        "RTE"
                                    ]
                                },
                                {
                                    "title": "ROTONDE",
                                    "enum": [
                                        "RTD"
                                    ]
                                },
                                {
                                    "title": "ROQUET",
                                    "enum": [
                                        "ROQT"
                                    ]
                                },
                                {
                                    "title": "ROND POINT",
                                    "enum": [
                                        "RPT"
                                    ]
                                },
                                {
                                    "title": "ROCADE",
                                    "enum": [
                                        "ROC"
                                    ]
                                },
                                {
                                    "title": "RESIDENCE",
                                    "enum": [
                                        "RES"
                                    ]
                                },
                                {
                                    "title": "REMPART",
                                    "enum": [
                                        "REM"
                                    ]
                                },
                                {
                                    "title": "RAMPE",
                                    "enum": [
                                        "RPE"
                                    ]
                                },
                                {
                                    "title": "RAIDILLON",
                                    "enum": [
                                        "RAID"
                                    ]
                                },
                                {
                                    "title": "RACCOURCI",
                                    "enum": [
                                        "RAC"
                                    ]
                                },
                                {
                                    "title": "QUARTIER",
                                    "enum": [
                                        "QUA"
                                    ]
                                },
                                {
                                    "title": "QUAI",
                                    "enum": [
                                        "QU"
                                    ]
                                },
                                {
                                    "title": "PROMENADE",
                                    "enum": [
                                        "PROM"
                                    ]
                                },
                                {
                                    "title": "PRESQ'ILE",
                                    "enum": [
                                        "PRQ"
                                    ]
                                },
                                {
                                    "title": "PRE",
                                    "enum": [
                                        "PRE"
                                    ]
                                },
                                {
                                    "title": "ROUTE",
                                    "enum": [
                                        "RTE."
                                    ]
                                },
                                {
                                    "title": "MONTEE",
                                    "enum": [
                                        "MTE."
                                    ]
                                },
                                {
                                    "title": "ESPLANADE",
                                    "enum": [
                                        "ESP."
                                    ]
                                },
                                {
                                    "title": "PLACE",
                                    "enum": [
                                        "PL."
                                    ]
                                },
                                {
                                    "title": "AVENUE",
                                    "enum": [
                                        "AV."
                                    ]
                                },
                                {
                                    "title": "CHAUSSEE",
                                    "enum": [
                                        "CHS."
                                    ]
                                },
                                {
                                    "title": "CITE",
                                    "enum": [
                                        "CITE"
                                    ]
                                },
                                {
                                    "title": "ALLEE",
                                    "enum": [
                                        "ALL."
                                    ]
                                },
                                {
                                    "title": "ZONE",
                                    "enum": [
                                        "ZONE"
                                    ]
                                },
                                {
                                    "title": "IMPASSE",
                                    "enum": [
                                        "IMP."
                                    ]
                                },
                                {
                                    "title": "CENTRE",
                                    "enum": [
                                        "CTR."
                                    ]
                                },
                                {
                                    "title": "ROND-POINT",
                                    "enum": [
                                        "R-P."
                                    ]
                                },
                                {
                                    "title": "CHEMIN",
                                    "enum": [
                                        "CHE."
                                    ]
                                },
                                {
                                    "title": "DOMAINE",
                                    "enum": [
                                        "DOM."
                                    ]
                                },
                                {
                                    "title": "SQUARE",
                                    "enum": [
                                        "SQ."
                                    ]
                                },
                                {
                                    "title": "BOULEVARD",
                                    "enum": [
                                        "BD."
                                    ]
                                },
                                {
                                    "title": "RESIDENCE",
                                    "enum": [
                                        "RES."
                                    ]
                                },
                                {
                                    "title": "AUTOROUTE",
                                    "enum": [
                                        "ATR."
                                    ]
                                },
                                {
                                    "title": "COTE",
                                    "enum": [
                                        "COTE"
                                    ]
                                },
                                {
                                    "title": "SENTIER",
                                    "enum": [
                                        "SEN."
                                    ]
                                },
                                {
                                    "title": "PLATEAU",
                                    "enum": [
                                        "PLT."
                                    ]
                                },
                                {
                                    "title": "PASSAGE",
                                    "enum": [
                                        "PAS."
                                    ]
                                },
                                {
                                    "title": "QUAI",
                                    "enum": [
                                        "QUAI"
                                    ]
                                },
                                {
                                    "title": "QUARTIER",
                                    "enum": [
                                        "QUA."
                                    ]
                                },
                                {
                                    "title": "RUELLE",
                                    "enum": [
                                        "RLE."
                                    ]
                                },
                                {
                                    "title": "MAISON",
                                    "enum": [
                                        "MSN."
                                    ]
                                },
                                {
                                    "title": "MARCHE",
                                    "enum": [
                                        "MAR."
                                    ]
                                },
                                {
                                    "title": "CEINTURE",
                                    "enum": [
                                        "CTE."
                                    ]
                                },
                                {
                                    "title": "PORTE",
                                    "enum": [
                                        "PTE."
                                    ]
                                },
                                {
                                    "title": "CIRCUIT",
                                    "enum": [
                                        "CIR."
                                    ]
                                },
                                {
                                    "title": "RAVIN",
                                    "enum": [
                                        "RAV."
                                    ]
                                },
                                {
                                    "title": "RUE",
                                    "enum": [
                                        "RUE"
                                    ]
                                },
                                {
                                    "title": "Impasse",
                                    "enum": [
                                        "IMPASSE"
                                    ]
                                },
                                {
                                    "title": "3ª Travessa",
                                    "enum": [
                                        "3TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Canelha",
                                    "enum": [
                                        "CANELHA"
                                    ]
                                },
                                {
                                    "title": "6º Beco",
                                    "enum": [
                                        "6BECO"
                                    ]
                                },
                                {
                                    "title": "Miradouro",
                                    "enum": [
                                        "MIRADOURO"
                                    ]
                                },
                                {
                                    "title": "5º Beco",
                                    "enum": [
                                        "5BECO"
                                    ]
                                },
                                {
                                    "title": "4º Beco",
                                    "enum": [
                                        "4BECO"
                                    ]
                                },
                                {
                                    "title": "Prolongamento",
                                    "enum": [
                                        "PROLONGAME"
                                    ]
                                },
                                {
                                    "title": "7ª Viela",
                                    "enum": [
                                        "7VIELA"
                                    ]
                                },
                                {
                                    "title": "6ª Viela",
                                    "enum": [
                                        "6VIELA"
                                    ]
                                },
                                {
                                    "title": "5ª Viela",
                                    "enum": [
                                        "5VIELA"
                                    ]
                                },
                                {
                                    "title": "4ª Viela",
                                    "enum": [
                                        "4VIELA"
                                    ]
                                },
                                {
                                    "title": "3ª Viela",
                                    "enum": [
                                        "3VIELA"
                                    ]
                                },
                                {
                                    "title": "6ª Travessa",
                                    "enum": [
                                        "6TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "5ª Travessa",
                                    "enum": [
                                        "5TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "4ª Travessa",
                                    "enum": [
                                        "4TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Volta",
                                    "enum": [
                                        "VOLTA"
                                    ]
                                },
                                {
                                    "title": "Couraça",
                                    "enum": [
                                        "COURACA"
                                    ]
                                },
                                {
                                    "title": "Canada",
                                    "enum": [
                                        "CANADA"
                                    ]
                                },
                                {
                                    "title": "Aceiro",
                                    "enum": [
                                        "ACEIRO"
                                    ]
                                },
                                {
                                    "title": "Subida",
                                    "enum": [
                                        "SUBIDA"
                                    ]
                                },
                                {
                                    "title": "Parada",
                                    "enum": [
                                        "PARADA"
                                    ]
                                },
                                {
                                    "title": "Hemiciclo",
                                    "enum": [
                                        "HEMICICLO"
                                    ]
                                },
                                {
                                    "title": "Carreirinho",
                                    "enum": [
                                        "CARREIRINH"
                                    ]
                                },
                                {
                                    "title": "Viaduto",
                                    "enum": [
                                        "VIADUTO"
                                    ]
                                },
                                {
                                    "title": "Calçadinha",
                                    "enum": [
                                        "CALCADINHA"
                                    ]
                                },
                                {
                                    "title": "Doca",
                                    "enum": [
                                        "DOCA"
                                    ]
                                },
                                {
                                    "title": "Boqueirão",
                                    "enum": [
                                        "BOQUEIRAO"
                                    ]
                                },
                                {
                                    "title": "Regueirão",
                                    "enum": [
                                        "REGUEIRAO"
                                    ]
                                },
                                {
                                    "title": "Campus",
                                    "enum": [
                                        "CAMPUS"
                                    ]
                                },
                                {
                                    "title": "Correnteza",
                                    "enum": [
                                        "CORRENTEZA"
                                    ]
                                },
                                {
                                    "title": "Praça",
                                    "enum": [
                                        "PRACA"
                                    ]
                                },
                                {
                                    "title": "Avenida",
                                    "enum": [
                                        "AVENIDA"
                                    ]
                                },
                                {
                                    "title": "Praceta",
                                    "enum": [
                                        "PRACETA"
                                    ]
                                },
                                {
                                    "title": "Largo",
                                    "enum": [
                                        "LARGO"
                                    ]
                                },
                                {
                                    "title": "Canto",
                                    "enum": [
                                        "CANTO"
                                    ]
                                },
                                {
                                    "title": "Travessa",
                                    "enum": [
                                        "TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Rua",
                                    "enum": [
                                        "RUA"
                                    ]
                                },
                                {
                                    "title": "Beco",
                                    "enum": [
                                        "BECO"
                                    ]
                                },
                                {
                                    "title": "Passeio",
                                    "enum": [
                                        "PASSEIO"
                                    ]
                                },
                                {
                                    "title": "Vereda",
                                    "enum": [
                                        "VEREDA"
                                    ]
                                },
                                {
                                    "title": "2ª Travessa",
                                    "enum": [
                                        "2TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Carreira",
                                    "enum": [
                                        "CARREIRA"
                                    ]
                                },
                                {
                                    "title": "1ª Travessa",
                                    "enum": [
                                        "1TRAVESSA"
                                    ]
                                },
                                {
                                    "title": "Escadas",
                                    "enum": [
                                        "ESCADAS"
                                    ]
                                },
                                {
                                    "title": "Ligação",
                                    "enum": [
                                        "LIGACAO"
                                    ]
                                },
                                {
                                    "title": "Vila",
                                    "enum": [
                                        "VILA"
                                    ]
                                },
                                {
                                    "title": "Campo",
                                    "enum": [
                                        "CAMPO"
                                    ]
                                },
                                {
                                    "title": "Ponte",
                                    "enum": [
                                        "PONTE"
                                    ]
                                },
                                {
                                    "title": "Chão",
                                    "enum": [
                                        "CHAO"
                                    ]
                                },
                                {
                                    "title": "Gaveto",
                                    "enum": [
                                        "GAVETO"
                                    ]
                                },
                                {
                                    "title": "Marginal",
                                    "enum": [
                                        "MARGINAL"
                                    ]
                                },
                                {
                                    "title": "Azinhaga",
                                    "enum": [
                                        "AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "Esplanada",
                                    "enum": [
                                        "ESPLANADA"
                                    ]
                                },
                                {
                                    "title": "3º Beco",
                                    "enum": [
                                        "3BECO"
                                    ]
                                },
                                {
                                    "title": "1º Beco",
                                    "enum": [
                                        "1BECO"
                                    ]
                                },
                                {
                                    "title": "2º Beco",
                                    "enum": [
                                        "2BECO"
                                    ]
                                },
                                {
                                    "title": "Via",
                                    "enum": [
                                        "VIA"
                                    ]
                                },
                                {
                                    "title": "Transversal",
                                    "enum": [
                                        "TRANSVERSA"
                                    ]
                                },
                                {
                                    "title": "Caminho Municipal",
                                    "enum": [
                                        "CAMINMUNIC"
                                    ]
                                },
                                {
                                    "title": "Loteamento",
                                    "enum": [
                                        "LOTEAMENTO"
                                    ]
                                },
                                {
                                    "title": "Ramal",
                                    "enum": [
                                        "RAMAL"
                                    ]
                                },
                                {
                                    "title": "Arruamento",
                                    "enum": [
                                        "ARRUAMENTO"
                                    ]
                                },
                                {
                                    "title": "Aldeamento",
                                    "enum": [
                                        "ALDEAMENTO"
                                    ]
                                },
                                {
                                    "title": "Estrada Regional",
                                    "enum": [
                                        "ESTRAREGIO"
                                    ]
                                },
                                {
                                    "title": "2ª Rua",
                                    "enum": [
                                        "2RUA"
                                    ]
                                },
                                {
                                    "title": "1ª Rua",
                                    "enum": [
                                        "1RUA"
                                    ]
                                },
                                {
                                    "title": "3ª Rua",
                                    "enum": [
                                        "3RUA"
                                    ]
                                },
                                {
                                    "title": "Itinerário Principal",
                                    "enum": [
                                        "ITINEPRINC"
                                    ]
                                },
                                {
                                    "title": "Terreirinho",
                                    "enum": [
                                        "TERREIRINH"
                                    ]
                                },
                                {
                                    "title": "Jardim",
                                    "enum": [
                                        "JARDIM"
                                    ]
                                },
                                {
                                    "title": "Corredor",
                                    "enum": [
                                        "CORREDOR"
                                    ]
                                },
                                {
                                    "title": "Rossio",
                                    "enum": [
                                        "ROSSIO"
                                    ]
                                },
                                {
                                    "title": "Terreiro",
                                    "enum": [
                                        "TERREIRO"
                                    ]
                                },
                                {
                                    "title": "Cerca",
                                    "enum": [
                                        "CERCA"
                                    ]
                                },
                                {
                                    "title": "Ruela",
                                    "enum": [
                                        "RUELA"
                                    ]
                                },
                                {
                                    "title": "Cangosta",
                                    "enum": [
                                        "CANGOSTA"
                                    ]
                                },
                                {
                                    "title": "Quelha",
                                    "enum": [
                                        "QUELHA"
                                    ]
                                },
                                {
                                    "title": "Escadaria",
                                    "enum": [
                                        "ESCADARIA"
                                    ]
                                },
                                {
                                    "title": "Travessinha",
                                    "enum": [
                                        "TRAVESSINH"
                                    ]
                                },
                                {
                                    "title": "Encosta",
                                    "enum": [
                                        "ENCOSTA"
                                    ]
                                },
                                {
                                    "title": "Recanto",
                                    "enum": [
                                        "RECANTO"
                                    ]
                                },
                                {
                                    "title": "Circular",
                                    "enum": [
                                        "CIRCULAR"
                                    ]
                                },
                                {
                                    "title": "Quelho",
                                    "enum": [
                                        "QUELHO"
                                    ]
                                },
                                {
                                    "title": "Recta",
                                    "enum": [
                                        "RECTA"
                                    ]
                                },
                                {
                                    "title": "Rampinha",
                                    "enum": [
                                        "RAMPINHA"
                                    ]
                                },
                                {
                                    "title": "Larguinho",
                                    "enum": [
                                        "LARGUINHO"
                                    ]
                                },
                                {
                                    "title": "Caleja",
                                    "enum": [
                                        "CALEJA"
                                    ]
                                },
                                {
                                    "title": "6ª Transversal",
                                    "enum": [
                                        "6TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "5ª Transversal",
                                    "enum": [
                                        "5TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "4ª Transversal",
                                    "enum": [
                                        "4TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "3ª Transversal",
                                    "enum": [
                                        "3TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "2ª Transversal",
                                    "enum": [
                                        "2TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "1ª Transversal",
                                    "enum": [
                                        "1TRANSVERS"
                                    ]
                                },
                                {
                                    "title": "Tapada",
                                    "enum": [
                                        "TAPADA"
                                    ]
                                },
                                {
                                    "title": "Escada",
                                    "enum": [
                                        "ESCADA"
                                    ]
                                },
                                {
                                    "title": "Carreirinha",
                                    "enum": [
                                        "CARREIRINH"
                                    ]
                                },
                                {
                                    "title": "Descida",
                                    "enum": [
                                        "DESCIDA"
                                    ]
                                },
                                {
                                    "title": "Corredoura",
                                    "enum": [
                                        "CORREDOURA"
                                    ]
                                },
                                {
                                    "title": "Entrada",
                                    "enum": [
                                        "ENTRADA"
                                    ]
                                },
                                {
                                    "title": "Ladeirinha",
                                    "enum": [
                                        "LADEIRINHA"
                                    ]
                                },
                                {
                                    "title": "2º Largo",
                                    "enum": [
                                        "2LARGO"
                                    ]
                                },
                                {
                                    "title": "1º Largo",
                                    "enum": [
                                        "1LARGO"
                                    ]
                                },
                                {
                                    "title": "Estradão",
                                    "enum": [
                                        "ESTRADAO"
                                    ]
                                },
                                {
                                    "title": "Circunvalação",
                                    "enum": [
                                        "CIRCUNVALA"
                                    ]
                                },
                                {
                                    "title": "1º Canto",
                                    "enum": [
                                        "1CANTO"
                                    ]
                                },
                                {
                                    "title": "3ª Azinhaga",
                                    "enum": [
                                        "3AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "4ª Azinhaga",
                                    "enum": [
                                        "4AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "Revelim",
                                    "enum": [
                                        "REVELIM"
                                    ]
                                },
                                {
                                    "title": "2ª Azinhaga",
                                    "enum": [
                                        "2AZINHAGA"
                                    ]
                                },
                                {
                                    "title": "2ª Subida",
                                    "enum": [
                                        "2SUBIDA"
                                    ]
                                },
                                {
                                    "title": "1ª Subida",
                                    "enum": [
                                        "1SUBIDA"
                                    ]
                                },
                                {
                                    "title": "4º Impasse",
                                    "enum": [
                                        "4IMPASSE"
                                    ]
                                },
                                {
                                    "title": "7ª Vereda",
                                    "enum": [
                                        "7VEREDA"
                                    ]
                                },
                                {
                                    "title": "6ª Vereda",
                                    "enum": [
                                        "6VEREDA"
                                    ]
                                },
                                {
                                    "title": "5ª Vereda",
                                    "enum": [
                                        "5VEREDA"
                                    ]
                                },
                                {
                                    "title": "3º Impasse",
                                    "enum": [
                                        "3IMPASSE"
                                    ]
                                },
                                {
                                    "title": "4ª Vereda",
                                    "enum": [
                                        "4VEREDA"
                                    ]
                                },
                                {
                                    "title": "1º Impasse",
                                    "enum": [
                                        "1IMPASSE"
                                    ]
                                },
                                {
                                    "title": "2º Impasse",
                                    "enum": [
                                        "2IMPASSE"
                                    ]
                                },
                                {
                                    "title": "3ª Vereda",
                                    "enum": [
                                        "3VEREDA"
                                    ]
                                },
                                {
                                    "title": "2ª Vereda",
                                    "enum": [
                                        "2VEREDA"
                                    ]
                                },
                                {
                                    "title": "1ª Vereda",
                                    "enum": [
                                        "1VEREDA"
                                    ]
                                },
                                {
                                    "title": "Levada",
                                    "enum": [
                                        "LEVADA"
                                    ]
                                },
                                {
                                    "title": "3ª Canada",
                                    "enum": [
                                        "3CANADA"
                                    ]
                                },
                                {
                                    "title": "2ª Canada",
                                    "enum": [
                                        "2CANADA"
                                    ]
                                },
                                {
                                    "title": "1ª Canada",
                                    "enum": [
                                        "1CANADA"
                                    ]
                                },
                                {
                                    "title": "Grota",
                                    "enum": [
                                        "GROTA"
                                    ]
                                },
                                {
                                    "title": "2ª Viela",
                                    "enum": [
                                        "2VIELA"
                                    ]
                                },
                                {
                                    "title": "1ª Viela",
                                    "enum": [
                                        "1VIELA"
                                    ]
                                },
                                {
                                    "title": "Acesso",
                                    "enum": [
                                        "ACESSO"
                                    ]
                                },
                                {
                                    "title": "Arco",
                                    "enum": [
                                        "ARCO"
                                    ]
                                },
                                {
                                    "title": "Ilha",
                                    "enum": [
                                        "ILHA"
                                    ]
                                },
                                {
                                    "title": "Cais",
                                    "enum": [
                                        "CAIS"
                                    ]
                                },
                                {
                                    "title": "Carreiro",
                                    "enum": [
                                        "CARREIRO"
                                    ]
                                },
                                {
                                    "title": "Ladeira",
                                    "enum": [
                                        "LADEIRA"
                                    ]
                                },
                                {
                                    "title": "Casal",
                                    "enum": [
                                        "CASAL"
                                    ]
                                },
                                {
                                    "title": "Alto",
                                    "enum": [
                                        "ALTO"
                                    ]
                                },
                                {
                                    "title": "Estrada Municipal",
                                    "enum": [
                                        "ESTRAMUNIC"
                                    ]
                                },
                                {
                                    "title": "Variante",
                                    "enum": [
                                        "VARIANTE"
                                    ]
                                },
                                {
                                    "title": "Itinerário Complementar",
                                    "enum": [
                                        "ITINECOMPL"
                                    ]
                                },
                                {
                                    "title": "Rotunda",
                                    "enum": [
                                        "ROTUNDA"
                                    ]
                                },
                                {
                                    "title": "Auto-Estrada",
                                    "enum": [
                                        "AUTOESTRAD"
                                    ]
                                },
                                {
                                    "title": "Zona",
                                    "enum": [
                                        "ZONA"
                                    ]
                                },
                                {
                                    "title": "Pátio",
                                    "enum": [
                                        "PATIO"
                                    ]
                                },
                                {
                                    "title": "Calçada",
                                    "enum": [
                                        "CALCADA"
                                    ]
                                },
                                {
                                    "title": "Alameda",
                                    "enum": [
                                        "ALAMEDA"
                                    ]
                                },
                                {
                                    "title": "Quinta",
                                    "enum": [
                                        "QUINTA"
                                    ]
                                },
                                {
                                    "title": "Parque",
                                    "enum": [
                                        "PARQUE"
                                    ]
                                },
                                {
                                    "title": "Adro",
                                    "enum": [
                                        "ADRO"
                                    ]
                                },
                                {
                                    "title": "Rampa",
                                    "enum": [
                                        "RAMPA"
                                    ]
                                },
                                {
                                    "title": "Cantinho",
                                    "enum": [
                                        "CANTINHO"
                                    ]
                                },
                                {
                                    "title": "Estrada",
                                    "enum": [
                                        "ESTRADA"
                                    ]
                                },
                                {
                                    "title": "Caminho",
                                    "enum": [
                                        "CAMINHO"
                                    ]
                                },
                                {
                                    "title": "Bairro",
                                    "enum": [
                                        "BAIRRO"
                                    ]
                                },
                                {
                                    "title": "Estrada Nacional",
                                    "enum": [
                                        "ESTRANACIO"
                                    ]
                                },
                                {
                                    "title": "Urbanização",
                                    "enum": [
                                        "URBANIZACA"
                                    ]
                                },
                                {
                                    "title": "Escadinhas",
                                    "enum": [
                                        "ESCADINHAS"
                                    ]
                                },
                                {
                                    "title": "Viela",
                                    "enum": [
                                        "VIELA"
                                    ]
                                },
                                {
                                    "title": "Drum",
                                    "enum": [
                                        "Drum"
                                    ]
                                },
                                {
                                    "title": "Fundac",
                                    "enum": [
                                        "Fundac"
                                    ]
                                },
                                {
                                    "title": "Colonie",
                                    "enum": [
                                        "Colonie"
                                    ]
                                },
                                {
                                    "title": "Cartier",
                                    "enum": [
                                        "Cartier"
                                    ]
                                },
                                {
                                    "title": "Canal",
                                    "enum": [
                                        "Canal"
                                    ]
                                },
                                {
                                    "title": "Cale",
                                    "enum": [
                                        "Cale"
                                    ]
                                },
                                {
                                    "title": "Bulevard",
                                    "enum": [
                                        "Bulevard"
                                    ]
                                },
                                {
                                    "title": "Alee VII",
                                    "enum": [
                                        "Alee VII"
                                    ]
                                },
                                {
                                    "title": "Alee VI",
                                    "enum": [
                                        "Alee VI"
                                    ]
                                },
                                {
                                    "title": "Alee V",
                                    "enum": [
                                        "Alee V"
                                    ]
                                },
                                {
                                    "title": "Alee IV",
                                    "enum": [
                                        "Alee IV"
                                    ]
                                },
                                {
                                    "title": "Alee III",
                                    "enum": [
                                        "Alee III"
                                    ]
                                },
                                {
                                    "title": "Alee II",
                                    "enum": [
                                        "Alee II"
                                    ]
                                },
                                {
                                    "title": "Alee I",
                                    "enum": [
                                        "Alee I"
                                    ]
                                },
                                {
                                    "title": "Alee",
                                    "enum": [
                                        "Alee"
                                    ]
                                },
                                {
                                    "title": "Vad",
                                    "enum": [
                                        "Vad"
                                    ]
                                },
                                {
                                    "title": "Trecatoare",
                                    "enum": [
                                        "Trecatoare"
                                    ]
                                },
                                {
                                    "title": "Pod",
                                    "enum": [
                                        "Pod"
                                    ]
                                },
                                {
                                    "title": "Cvartal",
                                    "enum": [
                                        "Cvartal"
                                    ]
                                },
                                {
                                    "title": "Canton",
                                    "enum": [
                                        "Canton"
                                    ]
                                },
                                {
                                    "title": "Camp",
                                    "enum": [
                                        "Camp"
                                    ]
                                },
                                {
                                    "title": "Alee VIII",
                                    "enum": [
                                        "Alee VIII"
                                    ]
                                },
                                {
                                    "title": "Zona",
                                    "enum": [
                                        "Zona"
                                    ]
                                },
                                {
                                    "title": "Varianta",
                                    "enum": [
                                        "Varianta"
                                    ]
                                },
                                {
                                    "title": "Uz intern",
                                    "enum": [
                                        "Uz intern"
                                    ]
                                },
                                {
                                    "title": "Ulita",
                                    "enum": [
                                        "Ulita"
                                    ]
                                },
                                {
                                    "title": "Trecere",
                                    "enum": [
                                        "Trecere"
                                    ]
                                },
                                {
                                    "title": "Suis",
                                    "enum": [
                                        "Suis"
                                    ]
                                },
                                {
                                    "title": "Stradela",
                                    "enum": [
                                        "Stradela"
                                    ]
                                },
                                {
                                    "title": "Strada",
                                    "enum": [
                                        "Strada"
                                    ]
                                },
                                {
                                    "title": "Statia",
                                    "enum": [
                                        "Statia"
                                    ]
                                },
                                {
                                    "title": "Splai",
                                    "enum": [
                                        "Splai"
                                    ]
                                },
                                {
                                    "title": "Sosea",
                                    "enum": [
                                        "Sosea"
                                    ]
                                },
                                {
                                    "title": "Sir",
                                    "enum": [
                                        "Sir"
                                    ]
                                },
                                {
                                    "title": "Scuar",
                                    "enum": [
                                        "Scuar"
                                    ]
                                },
                                {
                                    "title": "Rampa",
                                    "enum": [
                                        "Rampa"
                                    ]
                                },
                                {
                                    "title": "Prelungire",
                                    "enum": [
                                        "Prelungire"
                                    ]
                                },
                                {
                                    "title": "Poteca",
                                    "enum": [
                                        "Poteca"
                                    ]
                                },
                                {
                                    "title": "Poligon",
                                    "enum": [
                                        "Poligon"
                                    ]
                                },
                                {
                                    "title": "Platou",
                                    "enum": [
                                        "Platou"
                                    ]
                                },
                                {
                                    "title": "Pietonal",
                                    "enum": [
                                        "Pietonal"
                                    ]
                                },
                                {
                                    "title": "Piata",
                                    "enum": [
                                        "Piata"
                                    ]
                                },
                                {
                                    "title": "Pasaj",
                                    "enum": [
                                        "Pasaj"
                                    ]
                                },
                                {
                                    "title": "Parc",
                                    "enum": [
                                        "Parc"
                                    ]
                                },
                                {
                                    "title": "Intrare",
                                    "enum": [
                                        "Intrare"
                                    ]
                                },
                                {
                                    "title": "Hotar",
                                    "enum": [
                                        "Hotar"
                                    ]
                                },
                                {
                                    "title": "Fundatura",
                                    "enum": [
                                        "Fundatura"
                                    ]
                                },
                                {
                                    "title": "Curte",
                                    "enum": [
                                        "Curte"
                                    ]
                                }
                            ],
                            "type": "string"
                        },
                        "postal_address:g_p_s_longitude": {
                            "maximum": 99999.99999999999999999999E0,
                            "type": "number"
                        },
                        "postal_address:confidential": {
                            "type": "boolean"
                        },
                        "postal_address:invalid": {
                            "type": "boolean"
                        },
                        "postal_address:postal_code": {
                            "type": "string",
                            "maxLength": 10
                        },
                        "postal_address:anonymous": {
                            "type": "boolean"
                        },
                        "postal_address:city_code": {
                            "type": "string",
                            "maxLength": 38
                        },
                        "postal_address:street_name": {
                            "type": "string",
                            "maxLength": 160
                        },
                        "postal_address:tax_address": {
                            "type": "boolean"
                        },
                        "postal_address:address_category": {
                            "type": "string",
                            "maxLength": 30
                        },
                        "postal_address:preferred": {
                            "type": "boolean"
                        },
                        "postal_address:addressee_name": {
                            "type": "string",
                            "maxLength": 80
                        },
                        "postal_address:geographical_zone_name": {
                            "type": "string",
                            "maxLength": 30
                        },
                        "postal_address:country_code": {
                            "type": "string",
                            "maxLength": 2
                        },
                        "postal_address:local_name": {
                            "type": "string",
                            "maxLength": 80
                        }
                    }
                },
                "curies": [
                    {
                        "templated": "true",
                        "name": "cscrel",
                        "href": "/rel/{rel}"
                    }
                ],
                "method": "POST",
                "rel": "create",
                "mediaType": "application/json",
                "href": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7R2D/postal_addresses",
                "title": "Create a Postal Address",
                "type": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressCollection",
                "cscrel:item-type": "http://20.33.40.147:13111/csc/insurance/schemas/persons/postalAddressDocument"
            }
        ],
        "title": "Postal Address collection interactions",
        "properties": {
            "oneOf": [
                {
                    "_count": {
                        "pattern": "^\\\\[0-9]+\\\\+$",
                        "type": "string"
                    }
                },
                {
                    "_count": {
                        "type": "integer"
                    }
                }
            ],
            "_links": {
                "type": "object",
                "properties": {
                    "item": {
                        "type": "object",
                        "properties": {
                            "summary": {
                                "type": "object",
                                "properties": {
                                    "postal_address:preferred": {
                                        "type": "boolean"
                                    },
                                    "postal_address:city_name": {
                                        "type": "string",
                                        "maxLength": 70
                                    },
                                    "postal_address:format_type": {
                                        "oneOf": [
                                            {
                                                "description": "language:en-GB",
                                                "title": "PO Box",
                                                "enum": [
                                                    "po_box"
                                                ]
                                            },
                                            {
                                                "description": "language:en-GB",
                                                "title": "Postal Address",
                                                "enum": [
                                                    "postal_address"
                                                ]
                                            }
                                        ],
                                        "type": "string"
                                    },
                                    "postal_address:confidential": {
                                        "type": "boolean"
                                    },
                                    "postal_address:country_code": {
                                        "type": "string",
                                        "maxLength": 2
                                    },
                                    "postal_address:tax_address": {
                                        "type": "boolean"
                                    },
                                    "postal_address:postal_code": {
                                        "type": "string",
                                        "maxLength": 10
                                    },
                                    "postal_address:display_id": {
                                        "type": "string",
                                        "maxLength": 75
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}