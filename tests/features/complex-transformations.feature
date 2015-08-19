Feature: Complex Transformations


Scenario: Serial readers and transformers configured with an array of objects

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [{
                    "type": "jsonPointer",
                    "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
                }, {
                    "type": "jsonPointer",
                    "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                }]
            },
            "transformer": {
                "type": "serial",
                "transformers": [{
                    "type": "concatenate",
                    "separator": "_"
                }, {
                    "type": "prefix",
                    "text": "FOO_"
                }]
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/combined-isbn"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "combined-isbn": "FOO_1631403869_978-1631403866"
    }
    ------------------------------------


Scenario: Serial readers and transformers configured with an array of strings

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": {
                "type": "serial",
                "transformers": [
                    "concatenate",
                    "prefix"
                ]
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/combined-isbn"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "combined-isbn": "1631403869 978-1631403866"
    }
    ------------------------------------


Scenario: Mutual exclusion (first reader present)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/format",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "mutualExclusion",
            "writer": {
                "type": "jsonPointer",
                "path": "/format-or-isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "format-or-isbn-13": "paperback"
    }
    ------------------------------------


Scenario: Mutual exclusion (second reader present)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/foo",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "mutualExclusion",
            "writer": {
                "type": "jsonPointer",
                "path": "/format-or-isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "format-or-isbn-13": "978-1631403866"
    }
    ------------------------------------


Scenario: Guard condition (first reader truthy)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/format",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "guard",
            "writer": {
                "type": "jsonPointer",
                "path": "/isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
    }
    ------------------------------------


Scenario: Guard condition (first reader falsey)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/foo",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "guard",
            "writer": {
                "type": "jsonPointer",
                "path": "/isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "isbn-13": "978-1631403866"
    }
    ------------------------------------


Scenario: Conditional (first reader truthy)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/format",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "conditional",
            "writer": {
                "type": "jsonPointer",
                "path": "/isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "isbn-13": "978-1631403866"
    }
    ------------------------------------


Scenario: Conditional (second reader falsey)

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": "1631403869",
                        "isbn-13": "978-1631403866",
                        "format": "paperback",
                        "publisher": "IDW Publishing (27 Aug. 2015)",
                        "published": "2015-08-18T23:23:24.140Z",
                        "pages": 152
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
                "type": "serial",
                "readers": [
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/foo",
                    "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-13"
                ]
            },
            "transformer": "conditional",
            "writer": {
                "type": "jsonPointer",
                "path": "/isbn-13"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
    }
    ------------------------------------
