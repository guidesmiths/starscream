Feature: Simple Transformations

Scenario: Array of objects mapping

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
            },
            "transformer": {
                "type": "passThrough"
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/Transfomers: Combiner Wars"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": "1631403869"
    }
    ------------------------------------


Scenario: Array of reader, transformer and writer pairs

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10",
            "transformer": "passThrough",
            "writer": "/Transfomers: Combiner Wars"
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": "1631403869"
    }
    ------------------------------------


Scenario: Array of objects mapping and default reader and transformer

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "writer": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


Scenario: Array of objects mapping with default writer and transformer

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


Scenario: Array of reader paths mapping

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------

    [
        "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
    ]

    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


Scenario: Object mapping with reader path => writer path

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------

    {
        "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10": "/Transfomers: Combiner Wars"
    }

    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": "1631403869"
    }
    ------------------------------------


Scenario: Object mapping with reader path => transformer and writer objects

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------

    {
        "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10": {
            "transformer": {
                "type": "passThrough"
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/Transfomers: Combiner Wars"
            }
        }
    }

    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": "1631403869"
    }
    ------------------------------------


Scenario: Object mapping with reader path => default transformer and writer

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------

    {
        "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10": {}
    }

    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


Scenario: Tollerates missing values

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-11"
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/Transfomers: Combiner Wars"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
    }
    ------------------------------------


Scenario: Optionally renders missing values

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869"
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-11"
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/Transfomers: Combiner Wars",
                "ignoreMissing": false
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": undefined
    }
    ------------------------------------
